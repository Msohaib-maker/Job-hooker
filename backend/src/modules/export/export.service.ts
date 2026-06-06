import { Job } from "@/src/models/job-model";
import { GoogleGenAI } from "@google/genai";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as PDFDocument from "pdfkit";
import {
  Education,
  ExportPayload,
  ProfileForm,
  SkillItem,
} from "./export.types";
import {
  renderHeader,
  renderDivider,
  renderSummary,
  renderExperience,
  renderSkillsMatrix,
  renderEducation,
  renderInlineTagsSection,
  renderDate,
  renderRecipientInfo,
  renderSubjectAndSalutation,
  renderSignOff,
} from "./export.file.utils";

@Injectable()
export class ExportService {
  private ai: GoogleGenAI;

  constructor(private configService: ConfigService) {
    this.ai = new GoogleGenAI({
      apiKey: this.configService.get<string>("GEMINI_API_KEY"),
    });
  }

  /**
   * Generates an AI-optimized professional CV directly into a PDF Buffer
   */
  public async generateCV(payload: ExportPayload): Promise<Buffer> {
    const { profile, job } = payload;

    // 1. Optimize the summary with Gemini using our clean string tokenizer context
    // const optimizedDescription = await this.optimizeSummaryWithAi(
    //   profile,
    //   job.description
    // );
    const optimizedDescription = { summary: profile.description };

    // 2. Build the PDF Document using isolated pipeline blocks
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50, size: "A4" });
        const buffers: Buffer[] = [];

        doc.on("data", (chunk) => buffers.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(buffers)));
        doc.on("error", (err) => reject(err));

        // Dynamic Pipeline Execution with clean conditional dividers
        const sections: (() => boolean)[] = [
          () => renderSummary(doc, optimizedDescription.summary),
          () => renderExperience(doc, profile.experience),
          () => renderSkillsMatrix(doc, profile.skills),
          () => renderEducation(doc, profile.education),
          () =>
            renderInlineTagsSection(doc, "CERTIFICATES", profile.certificates),
          () => renderInlineTagsSection(doc, "LANGUAGES", profile.languages),
          () => renderInlineTagsSection(doc, "INTERESTS", profile.interests),
        ];

        // Render header first (always exists)
        renderHeader(doc, profile);
        renderDivider(doc); // ← add this

        let previousRendered = false;

        for (const renderSection of sections) {
          if (previousRendered) {
            renderDivider(doc);
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

  /**
   * Generates an AI-optimized professional Cover Letter directly into a PDF Buffer
   */
  public async generateCoverLetter(payload: ExportPayload): Promise<Buffer> {
    const { profile, job } = payload;

    // 1. Optimize the cover letter body using isolated builder
    const optimizedLetterBody = await this.buildCoverLetterBodyWithAi(
      profile,
      job
    );

    // 2. Build the PDF Document structure
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50, size: "A4" });
        const buffers: Buffer[] = [];

        doc.on("data", (chunk) => buffers.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(buffers)));
        doc.on("error", (err) => reject(err));

        // Layout Rendering Pipeline
        renderHeader(doc, profile);
        renderDivider(doc);
        renderDate(doc);
        renderRecipientInfo(doc, job);
        renderSubjectAndSalutation(doc, job);

        // Render the main paragraphs body text
        doc
          .fillColor("#262626")
          .fontSize(10.5)
          .font("Helvetica")
          .text(optimizedLetterBody, { align: "justify", lineGap: 4.5 });

        renderSignOff(doc, profile.name);

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  }

  public async generateProposalLetter(payload: ExportPayload): Promise<string> {
    return await this.createUpworkProposalWithAI(payload);
  }

  // =========================================================================
  // AI Summary Generator for CV
  // =========================================================================

  private async createUpworkProposalWithAI(
    payload: ExportPayload
  ): Promise<string> {
    const { profile, job } = payload;
    const skillsSection = profile.skills?.length
      ? profile.skills
          .map((s) => `${s.name} (Expertise: ${s.expertise}/5)`)
          .join(", ")
      : "None provided";

    const interestsSection = profile.interests?.length
      ? profile.interests.join(", ")
      : "None provided";

    const experienceSection =
      profile.experience
        ?.map(
          (exp) =>
            `- ${exp.role} at ${exp.company} (${exp.duration})${exp.description ? `: ${exp.description}` : ""}`
        )
        .join("\n") || "None provided";

    const aiPromptContext = `
  CANDIDATE PROFILE:
  - Name: ${profile.name}
  - Core Skills: ${skillsSection}
  - Key Interests: ${interestsSection}
  - Professional Summary: ${profile.description || "None provided"}

  WORK EXPERIENCE:
  ${experienceSection}



  TARGET JOB DETAILS:
  - Job Description: ${job.description}
      `;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction:
            "You are an expert Upwork freelancer and proposal writer. Your goal is to write a highly targeted, " +
            "compelling Upwork proposal that directly addresses what the client is asking for in their job post. " +
            "Structure the proposal as follows: " +
            "1) An attention-grabbing opening line that mirrors the client's core problem or need. " +
            "2) A concise body that maps the freelancer's most relevant skills, experience, and past work " +
            "directly to the client's stated requirements — be specific, not generic. " +
            "3) A brief section showing you understand their project goals and any nuances they mentioned. " +
            "4) A confident, low-pressure closing that invites a conversation. " +
            "Keep the tone conversational yet professional — avoid corporate fluff. " +
            'Do NOT use generic phrases like "I am excited to apply" or "I am a perfect fit". ' +
            "Do NOT hallucinate skills or experience not present in the freelancer profile. " +
            'Return ONLY the raw proposal body text. Do not include a greeting line (e.g. "Hi,") ' +
            "or sign-off, as these are handled programmatically.",
          temperature: 0.6,
        },
        contents: [
          aiPromptContext,
          `Write a targeted Upwork proposal for the following job post. The proposal must directly address ` +
            `what the client asked for in the "${job.title}" posting by ${job.company}. ` +
            `Prioritize matching the freelancer's skills to the client's specific requirements, pain points, ` +
            `and any questions or instructions the client included in their job post.`,
        ],
      });

      if (response.text && response.text.trim().length > 0) {
        return response.text.trim();
      }
    } catch (error) {
      return this.generateFallbackLetterBody(profile, job);
    }
  }

  // =========================================================================
  // AI Summary Generator for CV
  // =========================================================================

  private async optimizeSummaryWithAi(
    profile: ProfileForm,
    jobDescription: string
  ): Promise<{ summary: string; suggestedSkills: string[] }> {
    const originalDescription = profile.description || "";

    const skillsString =
      profile.skills?.map((s) => `${s.name} (${s.expertise}/5)`).join(", ") ||
      "None provided";
    const interestsString = profile.interests?.length
      ? profile.interests.join(", ")
      : "None provided";

    const educationString =
      profile.education
        ?.map(
          (edu) =>
            `- ${edu.degree} at ${edu.institution} (Grade: ${edu.grade || "N/A"}/100)`
        )
        .join("\n") || "None provided";

    const experienceString =
      profile.experience
        ?.map(
          (exp) =>
            `- ${exp.role} at ${exp.company} (${exp.duration})${exp.description ? `: ${exp.description}` : ""}`
        )
        .join("\n") || "None provided";

    const aiPromptContext = `
  CANDIDATE PROFILE:
  - Name: ${profile.name}
  - Core Skills & Expertise Levels: ${skillsString}
  - Interests: ${interestsString}
  - Current Professional Summary: ${originalDescription || "None provided"}

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
      suggestedSkills: [] as string[],
    };

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction:
            "You are an expert career coach and technical copywriter. Your job is to rewrite " +
            "the candidate's professional summary to align perfectly with the target job description while remaining factually honest. " +
            "Keep the summary section punchy, high-impact, and between 3-4 sentences. " +
            "Additionally, identify 3-5 highly relevant, high-impact core skills or keywords from the target job description " +
            "that the candidate should emphasize based on their actual experience.\n\n" +
            "CRITICAL: You MUST strictly format your entire response exactly like this template, separated by vertical bars:\n" +
            "professional summary: [Your rewritten 3-4 sentence summary text here] | skills: [comma-separated list of keywords]\n\n" +
            "Do not include any intro, outro, markdown wrappers, or extra spacing around the vertical bars.",
          temperature: 0.4,
        },
        contents: [
          aiPromptContext,
          'Generate the matched summary and key skill tags using the explicit "professional summary: ... | skills: ..." pipeline format:',
        ],
      });

      const rawText = response.text?.trim() || "";
      console.log(rawText);
      const summaryMatch = rawText.match(
        /professional summary:\s*([\s\S]+?)\s*\|\s*skills:\s*([\s\S]+)/i
      );
      if (summaryMatch) {
        const summaryText = summaryMatch[1].trim();
        const skillsList = summaryMatch[2]
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        return { summary: summaryText, suggestedSkills: skillsList };
      }
    } catch (error) {
      if (!originalDescription) {
        throw new InternalServerErrorException(
          "Failed to generate tailored context via Gemini API",
          error.message
        );
      }
    }

    return fallbackResult;
  }

  // =========================================================================
  // AI CONTEXT GENERATOR & FALLBACK PARSER
  // =========================================================================

  private async buildCoverLetterBodyWithAi(
    profile: ProfileForm,
    job: Job
  ): Promise<string> {
    // Safely transform your object arrays into text strings using updated interface properties
    const skillsSection = profile.skills?.length
      ? profile.skills
          .map((s) => `${s.name} (Expertise: ${s.expertise}/5)`)
          .join(", ")
      : "None provided";

    const interestsSection = profile.interests?.length
      ? profile.interests.join(", ")
      : "None provided";

    const educationSection =
      profile.education
        ?.map(
          (edu) =>
            `- ${edu.degree} at ${edu.institution} (Grade: ${edu.grade}/100)`
        )
        .join("\n") || "None provided";

    const experienceSection =
      profile.experience
        ?.map(
          (exp) =>
            `- ${exp.role} at ${exp.company} (${exp.duration})${exp.description ? `: ${exp.description}` : ""}`
        )
        .join("\n") || "None provided";

    const aiPromptContext = `
  CANDIDATE PROFILE:
  - Name: ${profile.name}
  - Core Skills: ${skillsSection}
  - Key Interests: ${interestsSection}
  - Professional Summary: ${profile.description || "None provided"}

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
        model: "gemini-2.5-flash",
        config: {
          systemInstruction:
            "You are an expert executive career coach and professional writer. Your goal is to write a tailored, " +
            "persuasive cover letter that perfectly maps the candidate's actual qualifications, engineering abilities, " +
            "and core skills to the requirements of the target job description. " +
            "Structure the letter into 3-4 flowing paragraphs: An engaging introduction, a body mapping their " +
            "highest-impact professional abilities and academic qualifications, and a professional closing statement. " +
            "Keep the tone elite, professional, and authentic to their profile details. Do not hallucinate metrics. " +
            "Return ONLY the raw body paragraphs of the letter. Do not include date, recipient headers, subject line, " +
            "or the final sign-off name, as these are handled programmatically by the PDF renderer.",
          temperature: 0.5,
        },
        contents: [
          aiPromptContext,
          `Generate the body paragraphs for a professional cover letter matching the candidate's core abilities to the ${job.title} role at ${job.company}:`,
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

    const coreSkillsIntro =
      profile.skills && profile.skills.length > 0
        ? `Throughout my career, I have continuously refined my expertise in fields like ${profile.skills
            .slice(0, 4)
            .map((s) => s.name)
            .join(
              ", "
            )}, which position me well to introduce efficient architectures and premium results for ${job.company}.`
        : `I pride myself on my sharp technical capabilities, rapid learning velocity, and professional drive, which I look forward to channeling into your standard objectives.`;

    return (
      `I am writing to express my strong interest in the ${job.title} position currently open at ${job.company}. ${experienceIntro}\n\n` +
      `I have closely followed the engineering milestones coming from ${job.company}, and I am highly energized by the prospect of contributing to your team's ongoing innovation. ${coreSkillsIntro} I thrive in fast-paced environments and excel at transforming abstract operational challenges into clean, sustainable logic.\n\n` +
      `Thank you very much for your time, consideration, and the opportunity to submit my application. I look forward to discussing how my core capabilities, engineering mindset, and background can serve your team's immediate roadmaps.`
    );
  }
}
