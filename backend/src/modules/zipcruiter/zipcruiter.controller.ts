import { Controller, Get } from "@nestjs/common";
import { ZipRecruiterScrapper } from "./zipcruiter.service";

@Controller("zip")
export class ZipRecruiterController {
  constructor(private readonly scraper: ZipRecruiterScrapper) {}

  @Get("jobs")
  async fetchIndeedJobs() {
    const browser = await this.scraper.awaken();
    const data = await this.scraper.scrape(browser);
    return data;
  }
}
