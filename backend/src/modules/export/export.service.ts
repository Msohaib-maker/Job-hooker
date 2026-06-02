import { Job } from '@/src/models/job-model';
import { GoogleGenAI } from '@google/genai';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as PDFDocument from 'pdfkit';
import { Education, ExportPayload, ProfileForm, SkillItem } from './export.types';


@Injectable()
export class ExportService {
  
    private ai: GoogleGenAI;

    constructor(private configService: ConfigService) {
      this.ai = new GoogleGenAI({
        apiKey: this.configService.get<string>('GEMINI_API_KEY'),
      });
    }
  
  /**
   * Generates an AI-optimized professional CV directly into a PDF Buffer
   */
  async generateCV(payload: ExportPayload): Promise<Buffer> {
    const { profile, job } = payload;

    // 1. Optimize the summary with Gemini using our clean string tokenizer context
    //const optimizedDescription = await this.optimizeSummaryWithAi(profile, job.description);
    const optimizedDescription = {summary: job.description}

    // 2. Build the PDF Document using isolated pipeline blocks
   return new Promise((resolve, reject) => {
  try {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const buffers: Buffer[] = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', (err) => reject(err));

    // Dynamic Pipeline Execution with clean conditional dividers
    const sections: (() => boolean)[] = [
      () => this.renderSummary(doc, optimizedDescription.summary),
      () => this.renderExperience(doc, profile.experience),
      () => this.renderSkillsMatrix(doc, profile.skills),
      () => this.renderEducation(doc, profile.education),
      () => this.renderInlineTagsSection(doc, 'CERTIFICATES', profile.certificates),
      () => this.renderInlineTagsSection(doc, 'LANGUAGES', profile.languages),
      () => this.renderInlineTagsSection(doc, 'INTERESTS', profile.interests)
    ];

    // Render header first (always exists)
    this.renderHeader(doc, profile);
    this.renderDivider(doc); // ← add this

    let previousRendered = false;

for (const renderSection of sections) {
  if (previousRendered) {
    this.renderDivider(doc);
  }
  previousRendered = renderSection();
}

    // Note: If you notice an extra trailing divider at the very bottom, 
    // you can pop it off or use a look-ahead array check.

    doc.end();
  } catch (err) {
    reject(err);
  }
});
  }

  // =========================================================================
  // AI CONTEXT & GENERATION HELPERS
  // =========================================================================

  private async optimizeSummaryWithAi(profile: ProfileForm, jobDescription: string): Promise<{ summary: string; suggestedSkills: string[] }> {
    const originalDescription = profile.description || '';
    
    const skillsString = profile.skills?.map(s => `${s.name} (${s.expertise}/5)`).join(', ') || 'None provided';
    const interestsString = profile.interests?.length ? profile.interests.join(', ') : 'None provided';
    
    const educationString = profile.education?.map(edu => 
      `- ${edu.degree} at ${edu.institution} (Grade: ${edu.grade || 'N/A'}/100)`
    ).join('\n') || 'None provided';

    const experienceString = profile.experience?.map(exp => 
      `- ${exp.role} at ${exp.company} (${exp.duration})${exp.description ? `: ${exp.description}` : ''}`
    ).join('\n') || 'None provided';

    const aiPromptContext = `
CANDIDATE PROFILE:
- Name: ${profile.name}
- Core Skills & Expertise Levels: ${skillsString}
- Interests: ${interestsString}
- Current Professional Summary: ${originalDescription || 'None provided'}

WORK EXPERIENCE:
${experienceString}

EDUCATION:
${educationString}

TARGET JOB DESCRIPTION:
${jobDescription}
`;

    // Default structural fallback
    const fallbackResult = {
      summary: originalDescription,
      suggestedSkills: [] as string[]
    };

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: 
            'You are an expert career coach and technical copywriter. Your job is to rewrite ' +
            'the candidate\'s professional summary to align perfectly with the target job description while remaining factually honest. ' +
            'Keep the summary section punchy, high-impact, and between 3-4 sentences. ' +
            'Additionally, identify 3-5 highly relevant, high-impact core skills or keywords from the target job description ' +
            'that the candidate should emphasize based on their actual experience.\n\n' +
            'CRITICAL: You MUST strictly format your entire response exactly like this template, separated by vertical bars:\n' +
            'professional summary: [Your rewritten 3-4 sentence summary text here] | skills: [comma-separated list of keywords]\n\n' +
            'Do not include any intro, outro, markdown wrappers, or extra spacing around the vertical bars.',
          temperature: 0.4,
        },
        contents: [
          aiPromptContext,
          'Generate the matched summary and key skill tags using the explicit "professional summary: ... | skills: ..." pipeline format:'
        ],
      });

      const rawText = response.text?.trim() || '';
console.log(rawText)      
      const summaryMatch = rawText.match(/professional summary:\s*([\s\S]+?)\s*\|\s*skills:\s*([\s\S]+)/i);
if (summaryMatch) {
  const summaryText = summaryMatch[1].trim();
  const skillsList = summaryMatch[2].split(',').map(s => s.trim()).filter(Boolean);
  return { summary: summaryText, suggestedSkills: skillsList };
}
    } catch (error) {
      if (!originalDescription) {
        throw new InternalServerErrorException('Failed to generate tailored context via Gemini API', error.message);
      }
    }

    return fallbackResult;
  }

  // =========================================================================
  // PDF DRAWING CELLS / LAYOUT GENERATORS
  // =========================================================================

  private renderHeader(doc: PDFKit.PDFDocument, profile: ProfileForm): void {
  doc.fillColor('#111111')
     .fontSize(24)
     .font('Helvetica-Bold')
     .text(profile.name || 'Your Name', { align: 'left' });

  doc.moveDown(0.3);

  const contactInfo = [
    profile.email,
    profile.website,
    profile.otherLink
  ].filter(Boolean).join('   |   ');

  doc.fillColor('#555555')
     .fontSize(9.5)
     .font('Helvetica')
     .text(contactInfo, { align: 'left' });
}

private renderDivider(doc: PDFKit.PDFDocument): void {
  doc.moveDown(0.8);
  doc.strokeColor('#E5E5E5')
     .lineWidth(0.75) // Thinner line looks much cleaner
     .moveTo(50, doc.y)
     .lineTo(545, doc.y)
     .stroke();
  doc.moveDown(0.8); // Normalized, predictable padding
}

private renderSectionTitle(doc: PDFKit.PDFDocument, title: string): void {
  doc.fillColor('#111111')
     .fontSize(11) // Crisp, professional sizing
     .font('Helvetica-Bold')
     .text(title, { characterSpacing: 1.2 });
  doc.moveDown(0.6);
}

private renderSummary(doc: PDFKit.PDFDocument, description: string): boolean {
  if (!description) return false;

  this.renderSectionTitle(doc, 'PROFESSIONAL SUMMARY');
  doc.fillColor('#333333')
     .fontSize(9.5)
     .font('Helvetica')
     .text(description, { align: 'justify', lineGap: 3 });
  doc.moveDown(0.3);
  return true;
}

private renderExperience(doc: PDFKit.PDFDocument, experience: any[] | undefined): boolean {
  if (!experience || experience.length === 0) return false;

  this.renderSectionTitle(doc, 'PROFESSIONAL EXPERIENCE');

  experience.forEach((exp, index) => {
    const startY = doc.y;

    // Role and Company
    doc.fillColor('#111111')
       .fontSize(10.5)
       .font('Helvetica-Bold')
       .text(exp.role, { continued: true });
       
    doc.font('Helvetica')
       .fillColor('#444444')
       .text(` at ${exp.company}`);
    
    // Duration (Right-aligned)
    doc.fillColor('#666666')
       .fontSize(9.5)
       .text(exp.duration, 50, startY, { align: 'right', width: 495 });
    
    doc.x = 50; // Reset X

    if (exp.description) {
      doc.moveDown(0.3);
      doc.fillColor('#333333')
         .fontSize(9.5)
         .font('Helvetica')
         .text(exp.description, { align: 'justify', lineGap: 2.5 });
    }
    
    // Space between multiple jobs, but skip on the last item
    if (index < experience.length - 1) {
      doc.moveDown(0.8);
    }
  });
  
  return true;
}

private renderSkillsMatrix(doc: PDFKit.PDFDocument, skills: SkillItem[] | undefined): boolean {
  if (!skills || skills.length === 0) return false;

  this.renderSectionTitle(doc, 'CORE SKILLS & EXPERTISE');
  
  const formattedSkills = skills
    .map(s => `${s.name} (${s.expertise}/5)`)
    .join('    •    ');

  doc.fillColor('#333333')
     .fontSize(9.5)
     .font('Helvetica')
     .text(formattedSkills, { lineGap: 4 });
  
  return true;
}

private renderEducation(doc: PDFKit.PDFDocument, education: Education[] | undefined): boolean {
  if (!education || education.length === 0) return false;

  this.renderSectionTitle(doc, 'EDUCATION');

  education.forEach((edu, index) => {
    const startY = doc.y;

    // Format: "•  [Institute]" inline layout 
    doc.fillColor('#111111')
       .fontSize(10.5)
       .font('Helvetica-Bold')
       .text(`•   ${edu.institution}`, { continued: true });
       
    // Append degree right next to it with clean divider syntax
    doc.font('Helvetica')
       .fillColor('#444444')
       .text(`  —  ${edu.degree}`);
    
    // Format right-side metadata (Year / Grade details)
    // Adjust logic if you have a distinct 'edu.year' or 'edu.duration' field available
    const rightSideDetails = [
 
      edu.grade ? `Grade: ${edu.grade}/100` : ''
    ].filter(Boolean).join('  |  ');

    doc.fillColor('#666666')
       .fontSize(9.5)
       .text(rightSideDetails, 50, startY, { align: 'right', width: 495 });
    
    doc.x = 50; // Reset text baseline alignment

    if (index < education.length - 1) {
      doc.moveDown(0.6); // Spacing between different academic credentials
    }
  });

  return true;
}

private renderInlineTagsSection(doc: PDFKit.PDFDocument, title: string, tags: string[] | undefined): boolean {
  if (!tags || tags.length === 0) return false;

  this.renderSectionTitle(doc, title);
  
  doc.fillColor('#333333')
     .fontSize(9.5)
     .font('Helvetica')
     .text(tags.join('    •    '), { lineGap: 4 });

  return true;
}

  /**
   * Generates an AI-optimized professional Cover Letter directly into a PDF Buffer
   */
  async generateCoverLetter(payload: ExportPayload): Promise<Buffer> {
    const { profile, job } = payload;

    // 1. Optimize the cover letter body using isolated builder
    const optimizedLetterBody = await this.buildCoverLetterBodyWithAi(profile, job);

    // 2. Build the PDF Document structure
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        const buffers: Buffer[] = [];

        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', (err) => reject(err));

        // Layout Rendering Pipeline
        this.renderHeader(doc, profile);
        this.renderDivider(doc);
        this.renderDate(doc);
        this.renderRecipientInfo(doc, job);
        this.renderSubjectAndSalutation(doc, job);
        
        // Render the main paragraphs body text
        doc.fillColor('#262626')
           .fontSize(10.5)
           .font('Helvetica')
           .text(optimizedLetterBody, { align: 'justify', lineGap: 4.5 });

        this.renderSignOff(doc, profile.name);

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  }

  // =========================================================================
  // AI CONTEXT GENERATOR & FALLBACK PARSER
  // =========================================================================

  private async buildCoverLetterBodyWithAi(profile: ProfileForm, job: Job): Promise<string> {
    // Safely transform your object arrays into text strings using updated interface properties
    const skillsSection = profile.skills?.length 
      ? profile.skills.map(s => `${s.name} (Expertise: ${s.expertise}/5)`).join(', ') 
      : 'None provided';
      
    const interestsSection = profile.interests?.length ? profile.interests.join(', ') : 'None provided';
    
    const educationSection = profile.education?.map(edu => 
      `- ${edu.degree} at ${edu.institution} (Grade: ${edu.grade}/100)`
    ).join('\n') || 'None provided';

    const experienceSection = profile.experience?.map(exp => 
      `- ${exp.role} at ${exp.company} (${exp.duration})${exp.description ? `: ${exp.description}` : ''}`
    ).join('\n') || 'None provided';

    const aiPromptContext = `
CANDIDATE PROFILE:
- Name: ${profile.name}
- Core Skills: ${skillsSection}
- Key Interests: ${interestsSection}
- Professional Summary: ${profile.description || 'None provided'}

WORK EXPERIENCE:
${experienceSection}

EDUCATION & QUALIFICATIONS:
${educationSection}

TARGET JOB DETAILS:
- Title: ${job.title}
- Company: ${job.company}
- Job Description: ${job.description}
`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: 
            'You are an expert executive career coach and professional writer. Your goal is to write a tailored, ' +
            'persuasive cover letter that perfectly maps the candidate\'s actual qualifications, engineering abilities, ' +
            'and core skills to the requirements of the target job description. ' +
            'Structure the letter into 3-4 flowing paragraphs: An engaging introduction, a body mapping their ' +
            'highest-impact professional abilities and academic qualifications, and a professional closing statement. ' +
            'Keep the tone elite, professional, and authentic to their profile details. Do not hallucinate metrics. ' +
            'Return ONLY the raw body paragraphs of the letter. Do not include date, recipient headers, subject line, ' +
            'or the final sign-off name, as these are handled programmatically by the PDF renderer.',
          temperature: 0.5,
        },
        contents: [
          aiPromptContext,
          `Generate the body paragraphs for a professional cover letter matching the candidate's core abilities to the ${job.title} role at ${job.company}:`
        ],
      });

      if (response.text && response.text.trim().length > 0) {
        return response.text.trim();
      }
    } catch (error) {
      // Fallback gracefully using valid type assignments if Gemini API execution hits errors
      return this.generateFallbackLetterBody(profile, job);
    }

    return this.generateFallbackLetterBody(profile, job);
  }

  private generateFallbackLetterBody(profile: ProfileForm, job: Job): string {
    const hasExperience = profile.experience && profile.experience.length > 0;
    const experienceIntro = hasExperience
      ? `With a strong background including my role as ${profile.experience![0].role} at ${profile.experience![0].company}, I have built technical and analytical capabilities that directly align with the complexities of this position.`
      : `I am highly motivated to bring my academic qualifications, problem-solving mindset, and professional dedication to your engineering team.`;

    const coreSkillsIntro = profile.skills && profile.skills.length > 0
      ? `Throughout my career, I have continuously refined my expertise in fields like ${profile.skills.slice(0, 4).map(s => s.name).join(', ')}, which position me well to introduce efficient architectures and premium results for ${job.company}.`
      : `I pride myself on my sharp technical capabilities, rapid learning velocity, and professional drive, which I look forward to channeling into your standard objectives.`;

    return (
      `I am writing to express my strong interest in the ${job.title} position currently open at ${job.company}. ${experienceIntro}\n\n` +
      `I have closely followed the engineering milestones coming from ${job.company}, and I am highly energized by the prospect of contributing to your team's ongoing innovation. ${coreSkillsIntro} I thrive in fast-paced environments and excel at transforming abstract operational challenges into clean, sustainable logic.\n\n` +
      `Thank you very much for your time, consideration, and the opportunity to submit my application. I look forward to discussing how my core capabilities, engineering mindset, and background can serve your team's immediate roadmaps.`
    );
  }

  // =========================================================================
  // PDF VISUAL CELL LAYOUT GENERATORS
  // =========================================================================

  

  private renderDate(doc: PDFKit.PDFDocument): void {
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    doc.fillColor('#737373')
       .fontSize(10)
       .font('Helvetica')
       .text(dateStr);
    doc.moveDown(1);
  }

  private renderRecipientInfo(doc: PDFKit.PDFDocument, job: Job): void {
    doc.fillColor('#111111')
       .fontSize(10.5)
       .font('Helvetica-Bold')
       .text('Hiring Team');
    
    doc.font('Helvetica')
       .text(job.company);
    
    if (job.location) {
      doc.text(job.location);
    }
    
    doc.moveDown(1.5);
  }

  private renderSubjectAndSalutation(doc: PDFKit.PDFDocument, job: Job): void {
    doc.fillColor('#111111')
       .fontSize(11)
       .font('Helvetica-Bold')
       .text(`Subject: Application for the ${job.title} position`);
    
    doc.moveDown(1.2);

    doc.fillColor('#262626')
       .fontSize(10.5)
       .font('Helvetica')
       .text(`Dear Hiring Team at ${job.company},`);
    
    doc.moveDown(1);
  }

  private renderSignOff(doc: PDFKit.PDFDocument, candidateName: string): void {
    doc.moveDown(2);
    doc.fillColor('#262626')
       .fontSize(10.5)
       .font('Helvetica')
       .text('Sincerely,');
       
    doc.moveDown(1.5);
    doc.font('Helvetica-Bold')
       .text(`${candidateName || 'Candidate'}`);
  }
}
