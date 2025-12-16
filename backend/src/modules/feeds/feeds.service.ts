// src/feeds/feeds.service.ts

import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { FeedDto } from "./models/feeds-dto";

@Injectable()
export class FeedsService {
  constructor(private prisma: PrismaService) {}

  async createFeed(dto: FeedDto, email: string) {
    return this.prisma.jobFeed.create({
      data: {
        ...dto,
        user: { connect: { email } },
      },
    });
  }

  async getMyFeeds(id: number) {
    return this.prisma.jobFeed.findMany({
      where: { userId: id },
    });
  }

  async deleteFeed(feedId: number, userId: number) {
    // user can delete only his own feeds
    return this.prisma.jobFeed.deleteMany({
      where: { id: feedId, userId },
    });
  }

  async updateFeed(id: number, body: FeedDto, userId: number) {
    return this.prisma.jobFeed.update({
      data: { ...body },
      where: { id: id, userId },
    });
  }
}
