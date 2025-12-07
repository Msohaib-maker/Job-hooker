import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Job } from "@/src/models/job-model";
import { JobFeed } from "@/src/models/job-feed-model";

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async getFilteredJobs(feed: JobFeed) {
    const { title, location, salary, type } = feed;

    const jobs = await this.prisma.job.findMany();

    const filteredJobs = [];

    for (const job of jobs) {
      const titleCheck = job.title.includes(title);
      const typeCheck = job.type === type;
      const salaryCheck = job.salary >= salary;
      const locationCheck = job.location.includes(location);
      if (titleCheck || typeCheck || salaryCheck || locationCheck) {
        filteredJobs.push(job);
      }
    }

    return { filteredJobs };
  }
}
