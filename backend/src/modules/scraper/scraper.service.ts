import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { LinkedinJobsScraper } from "../linkedIn/linkedin.jobs";

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);
  EMAIL = "sohaibrobot22@gmail.com";
  PASSWORD = "&dL$Jp&i4A5g!**";

  constructor(private readonly jobService: LinkedinJobsScraper) {}

  @Cron("2 * * * *")
  async handleCron() {
    console.log("cron job ...");
    // this.jobService.scrape(this.EMAIL, this.PASSWORD);
  }
}
