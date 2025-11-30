import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { JobBody } from "@/src/models/job-model";

@Injectable()
export class AdminJobService {
  constructor(private readonly prismaService: PrismaService) {}

  async postJobs(jobs: JobBody) {
    const { data } = jobs;

    try {
      await Promise.all(
        data.map((job) => this.prismaService.job.create({ data: job }))
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
