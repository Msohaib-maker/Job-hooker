import { Injectable } from "@nestjs/common";
import { BrowserService } from "../scraper/browser/browser.service";
import { LinkedinLogin } from "./linkedin.login";
import { CookiesManager } from "../scraper/browser/cookies.manager";
import { LinkedinParser } from "./linkedin.parser";
import { JOB_SEARCH_URL } from "../scraper/constants/jobs-urls";
import {
  ExperienceLevel,
  WorkType,
  JobType,
  TimePosted,
} from "../../filters/job-filters";
import { buildLinkedInSearchUrl } from "../scraper/utils/url-builder.utils";
import { LinkedinRepository } from "./linkedin.respository";
import { handleDataBaseInsertion } from "../scraper/utils/db-utils";
import { scrapeDOM } from "../scraper/utils/html.utils";
import { Job } from "@/src/models/job-model";

@Injectable()
export class LinkedinJobsScraper {
  constructor(
    private readonly browserService: BrowserService,
    private readonly login: LinkedinLogin,
    private readonly cookies: CookiesManager,
    private readonly parser: LinkedinParser,
    private readonly repository: LinkedinRepository
  ) {}

  async scrape(email: string, password: string) {
    const page = await this.browserService.newPage();

    if (this.cookies.hasCookies()) {
      this.cookies.setCookies(await this.browserService.getBrowser());
    } else {
      await this.login.login(page, email, password);
      const dom = await scrapeDOM(page);
      console.log(
        dom.map((value) => value.text).filter((value) => value.trim() !== "")
      );
    }

    const searchUrl = buildLinkedInSearchUrl({
      keywords: "software developer",
      location: "Uzbekistan",
      workType: [WorkType.OnSite],
      timePosted: TimePosted.PastWeek,
    });

    await page.goto(searchUrl, { waitUntil: "networkidle2", timeout: 60000 });

    const data = await this.parser.extractFeed(page);
    handleDataBaseInsertion(
      () => {
        for (const job of data) {
          const jobStructure: Job = {
            id: job.id,
            title: job.title,
            description: job.text,
            creation: new Date(),
          };
          this.repository.create(jobStructure);
        }
      },
      (ex: any) => {
        console.log(ex);
      }
    );

    await page.close();
    return data;
  }
}
