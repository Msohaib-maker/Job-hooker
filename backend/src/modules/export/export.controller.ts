import { JwtAuthGuard } from "@/src/guards/jwt-auth.guard";
import { Job } from "@/src/models/job-model";
import { Controller, Post, Body, UseGuards, Res } from "@nestjs/common";
import { Response } from "express";
import { generatePdfBuffer } from "./util";
import { ExportService } from "./export.service";
import { ProfileForm } from "./export.types";

interface GenerateDto {
  profile: ProfileForm;
  job: Job;
  generate: {
    coverLetter: boolean;
    cv: boolean;
  };
}

@UseGuards(JwtAuthGuard)
@Controller("generate")
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Post("coverletter")
  async generateCoverLetter(@Body() body: GenerateDto, @Res() res: Response) {
    const { profile, job } = body;

    const pdfBuffer = await this.exportService.generateCoverLetter({
      profile: profile,
      job: job,
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="cover-letter.pdf"',
      "Content-Length": pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }

  @Post("cv")
  async generateCv(@Body() body: GenerateDto, @Res() res: Response) {
    const { profile, job } = body;

    const formattedExperience = profile.experience.map((exp) => ({
      ...exp,
      duration: {
        start: new Date(exp.duration.start),
        end:
          exp.duration.end === "Present"
            ? "Present"
            : (new Date(exp.duration.end) as Date | "Present"),
      },
    }));

    const formattedEducation = profile.education.map((edu) => ({
      ...edu,
      duration: {
        start: new Date(edu.duration.start),
        end:
          edu.duration.end === "Present"
            ? "Present"
            : (new Date(edu.duration.end) as Date | "Present"),
      },
    }));

    const pdfBuffer = await this.exportService.generateCV({
      profile: {
        ...profile,
        experience: formattedExperience,
        education: formattedEducation,
      },
      job: job,
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="cv.pdf"',
      "Content-Length": pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }

  @Post("proposalLetter")
  async generateProposalLetter(@Body() body: GenerateDto): Promise<string> {
    console.log("proposal letter");
    const { profile, job } = body;

    const proposal = await this.exportService.generateProposalLetter({
      profile: profile,
      job: job,
    });

    return proposal;
  }
}
