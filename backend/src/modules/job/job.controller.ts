// src/modules/job/job.controller.ts

import { Controller, Post, Get, Body, Query, UseGuards, Req } from "@nestjs/common";
import { JwtAuthGuard } from "@/src/guards/jwt-auth.guard";
import { JobService } from "./job.service";
import { JobFeed } from "@/src/models/job-feed-model";
import { PublicJobsQuery } from "./dto/public-jobs.dto";

@Controller("jobs")
export class JobController {
  constructor(private jobService: JobService) {}

  /**
   * Public job preview for the landing page — intentionally NOT guarded.
   * Response is sanitised in the service (no apply url, no contact email)
   * and capped at PUBLIC_MAX_LIMIT results.
   */
  @Get("public")
  async getPublicJobs(@Query() query: PublicJobsQuery) {
    return this.jobService.getPublicJobs(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async getFilteredJobs(@Body() body: JobFeed, @Req() req: any) {
    console.log("feed: ", body);
    return this.jobService.getFilteredJobs(body);
  }
}
