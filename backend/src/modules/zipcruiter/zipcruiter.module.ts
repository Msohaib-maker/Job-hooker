import { Module } from "@nestjs/common";
import { ZipRecruiterController } from "./zipcruiter.controller";
import { ZipRecruiterScrapper } from "./zipcruiter.service";

@Module({
  providers: [ZipRecruiterScrapper],
  controllers: [ZipRecruiterController],
})
export class ZipRecruiterModule {}
