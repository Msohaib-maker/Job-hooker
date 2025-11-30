import { Module } from "@nestjs/common";
import { IndeedScraper } from "./indeed.scraper";
import { IndeedController } from "./indeed.controller";

@Module({
  providers: [IndeedScraper],
  controllers: [IndeedController],
})
export class IndeedModule {}
