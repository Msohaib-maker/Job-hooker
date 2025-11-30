import { Module } from "@nestjs/common";
import { AdzunaController } from "./adzuna.controller";
import { AdzunaService } from "./adzuna.service";

@Module({
  providers: [AdzunaService],
  controllers: [AdzunaController],
})
export class AdzunaModule {}
