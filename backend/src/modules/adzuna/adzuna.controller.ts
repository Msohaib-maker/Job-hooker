import { Controller, Get } from "@nestjs/common";
import { AdzunaService } from "./adzuna.service";

@Controller("adzuna")
export class AdzunaController {
  constructor(private readonly scraper: AdzunaService) {}

  @Get("jobs")
  async fetchIndeedJobs() {
    const data = await this.scraper.getJobs();
    return data;
  }
}
