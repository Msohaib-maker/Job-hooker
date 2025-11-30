// src/feeds/feeds.service.ts

import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateFeedDto } from "./models/feeds-dto";

@Injectable()
export class FeedsService {
  constructor(private prisma: PrismaService) {}

  async createFeed(dto: CreateFeedDto, email: string) {
    return this.prisma.jobFeed.create({
      data: {
        ...dto,
        user: { connect: { email: email } },
      },
    });
  }

  async getMyFeeds(id: number) {
    return this.prisma.jobFeed.findMany({
      where: { id },
    });
  }

  async deleteFeed(feedId: number, userId: number) {
    // user can delete only his own feeds
    return this.prisma.jobFeed.deleteMany({
      where: { id: feedId, userId },
    });
  }
}
