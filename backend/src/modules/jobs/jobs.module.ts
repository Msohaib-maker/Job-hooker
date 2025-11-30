import { Module } from "@nestjs/common";
import { JobsController } from "./jobs.controller";
import { JobsService } from "./jobs.service";
import { BrowserService } from "../scraper/browser/browser.service";
import { CookiesManager } from "../scraper/browser/cookies.manager";
import { LinkedinJobsScraper } from "../linkedIn/linkedin.jobs";
import { LinkedinLogin } from "../linkedIn/linkedin.login";
import { LinkedinParser } from "../linkedIn/linkedin.parser";
import { LinkedinRepository } from "../linkedIn/linkedin.respository";

@Module({
  controllers: [JobsController],
  providers: [
    JobsService,
    LinkedinRepository,
    LinkedinLogin,
    LinkedinJobsScraper,
    LinkedinParser,
    BrowserService,
    CookiesManager,
  ],
  exports: [JobsService],
})
export class JobsModule {}
