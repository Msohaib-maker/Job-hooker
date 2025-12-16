// telegram.job-matcher.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JobFeed, Job } from "@prisma/client";

@Injectable()
export class TelegramJobMatcher {
  constructor(private prisma: PrismaService) {}

  async findJobsForFeed(feed: JobFeed): Promise<Job[]> {
    return this.prisma.job.findMany();
  }
}
