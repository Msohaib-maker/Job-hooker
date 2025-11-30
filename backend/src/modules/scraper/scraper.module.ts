import { Module } from "@nestjs/common";
import { ScraperService } from "./scraper.service";
import { JobsModule } from "../jobs/jobs.module";
import { LinkedinLogin } from "../linkedIn/linkedin.login";
import { LinkedinJobsScraper } from "../linkedIn/linkedin.jobs";
import { LinkedinParser } from "../linkedIn/linkedin.parser";
import { BrowserService } from "./browser/browser.service";
import { CookiesManager } from "./browser/cookies.manager";
import { LinkedinRepository } from "../linkedIn/linkedin.respository";
import { LinkedInModule } from "../linkedIn/linkedIn.module";

@Module({
  imports: [JobsModule, LinkedInModule],
  providers: [
    ScraperService,
    LinkedinLogin,
    LinkedinJobsScraper,
    LinkedinParser,
    BrowserService,
    CookiesManager,
    LinkedinRepository,
  ],
  exports: [ScraperService],
})
export class ScraperModule {}
