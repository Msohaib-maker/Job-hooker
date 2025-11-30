import { Module } from "@nestjs/common";
import { LinkedinJobsScraper } from "./linkedin.jobs";
import { LinkedinLogin } from "./linkedin.login";
import { LinkedinParser } from "./linkedin.parser";
import { LinkedinRepository } from "./linkedin.respository";
import { BrowserService } from "../scraper/browser/browser.service";
import { CookiesService } from "../cookies/cookies.service";
import { CookiesManager } from "../scraper/browser/cookies.manager";

@Module({
  providers: [
    BrowserService,
    CookiesService,
    CookiesManager,
    LinkedinJobsScraper,
    LinkedinLogin,
    LinkedinParser,
    LinkedinRepository,
  ],
  exports: [
    LinkedinJobsScraper,
    LinkedinLogin,
    LinkedinParser,
    LinkedinRepository,
  ],
})
export class LinkedInModule {}
