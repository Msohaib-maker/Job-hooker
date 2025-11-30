import { Controller, Post, Body } from "@nestjs/common";
import { JobsService } from "./jobs.service";

@Controller("jobs")
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post("/upwork")
  async scrapeJobs(@Body() body: { domain: string; userId: string }) {
    return this.jobsService.scrapeUpwork(body.domain, body.userId);
  }

  @Post("/upwork/open")
  async scrapeEndPoint() {
    return this.jobsService.scrapeEndPoint();
  }

  @Post("/linkedn")
  async scrapeLinkedn() {
    return this.jobsService.scrapeLinkedin();
  }

  @Post("/linkedn/jobs")
  async scrapeLinkednJobs() {
    return this.jobsService.scrapeLinkedinJobs();
  }
}
