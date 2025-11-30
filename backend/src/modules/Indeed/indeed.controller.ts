import { Controller, Get } from "@nestjs/common";
import { IndeedScraper } from "./indeed.scraper";

@Controller("indeed")
export class IndeedController {
  constructor(private readonly scraper: IndeedScraper) {}

  @Get("jobs")
  async fetchIndeedJobs() {
    const browser = await this.scraper.awaken();
    const data = await this.scraper.scrape(browser);
    return data;
  }
}
