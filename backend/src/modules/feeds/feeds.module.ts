// src/feeds/feeds.module.ts

import { Module } from "@nestjs/common";
import { FeedsService } from "./feeds.service";
import { FeedsController } from "./feeds.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [FeedsController],
  providers: [FeedsService, PrismaService],
})
export class FeedsModule {}
