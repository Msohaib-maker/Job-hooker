import { Injectable } from "@nestjs/common";
import { AdminJobService } from "./job.service";
import { JobBody } from "@/src/models/job-model";

@Injectable()
export class AdminService {
  constructor(private readonly adminJobService: AdminJobService) {}

  async postJobs(jobs: JobBody) {
    return await this.adminJobService.postJobs(jobs);
  }
}
