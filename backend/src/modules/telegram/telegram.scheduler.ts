import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { TelegramService } from "./telegram.service";
import { PrismaService } from "../prisma/prisma.service";
import { JobFeed, User, Job } from "@prisma/client";
import { TelegramJobMatcher } from "./telegram.job.matcher";
import { TelegramFormatter } from "./formatter/telegram.formatter";

const INTERVAL_SESSION =
  process.env.NODE === "production" ? 12 * 60 * 1000 * 60 : 60 * 10 * 1000;

@Injectable()
export class TelegramScheduler {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly prisma: PrismaService,
    private matcher: TelegramJobMatcher
  ) {}

  @Interval(INTERVAL_SESSION)
  async sendJobs() {
    const feeds = await this.getFeedsWithTelegramUsers();

    for (const feed of feeds) {
      const jobs = await this.matcher.findJobsForFeed(feed);
      console.log(jobs);
      for (const job of jobs) {
        await this.telegramService.sendMessage(
          feed.user.telegram_handle!,
          TelegramFormatter.formatJob(job)
        );
      }
    }
  }

  private getFeedsWithTelegramUsers() {
    return this.prisma.jobFeed.findMany({
      where: {
        user: { telegram_handle: { not: null } },
      },
      include: {
        user: { select: { telegram_handle: true } },
      },
    });
  }
}
