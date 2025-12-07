// src/feeds/feeds.controller.ts

import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Req,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "@/src/guards/jwt-auth.guard";
import { JobService } from "./job.service";
import { Job } from "@/src/models/job-model";
import { JobFeed } from "@/src/models/job-feed-model";

@UseGuards(JwtAuthGuard)
@Controller("jobs")
export class JobController {
  constructor(private jobService: JobService) {}

  @Post()
  async getFilteredJobs(@Body() body: JobFeed, @Req() req: any) {
    console.log("feed: ", body);
    return this.jobService.getFilteredJobs(body);
  }
}
