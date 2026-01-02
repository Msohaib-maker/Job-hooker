import { Telegraf } from "telegraf";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable, Logger } from "@nestjs/common";
import { TelegramFormatter } from "./formatter/telegram.formatter";
import { InjectBot } from "nestjs-telegraf";
import { Job, User } from "@prisma/client";

@Injectable()
export class SendService {
  private readonly logger = new Logger(SendService.name);

  constructor(
    private readonly prisma: PrismaService,
    @InjectBot()
    private readonly bot: Telegraf
  ) {}

  async sendJobsToUsers() {
    const jobs = await this.lockPendingJobs();
    if (!jobs.length) {
      this.logger.log("No jobs to dispatch");
      return;
    }

    const users = await this.getUsersFromDatabase();
    if (!users.length) {
      this.logger.warn("No Telegram users found");
      return;
    }

    for (const user of users) {
      for (const job of jobs) {
        try {
          const sent = await this.sendJobToUser(job, user);
          if (sent) {
            this.logger.log(`Job ${job.id} sent to user ${user.id}`);
          }
        } catch (err) {
          this.logger.error(
            `Failed sending job ${job.id} to user ${user.id}`,
            err
          );
        }
      }
    }
  }

  // ---------------- PRIVATE METHODS ----------------

  private async lockPendingJobs() {
    return this.prisma.job.findMany({
      where: { status: "pending" },
      take: 20,
    });
  }

  private async getUsersFromDatabase() {
    return this.prisma.user.findMany({
      where: {
        telegram_handle: { not: null },
      },
    });
  }

  private async sendJobToUser(job: Job, user: User): Promise<boolean> {
    const filteredJob = await this.getFilteredJobs(user, job);
    if (!filteredJob) return false;

    const message = TelegramFormatter.formatJob(filteredJob);

    await this.bot.telegram.sendMessage(user.telegram_handle!, message, {
      parse_mode: "HTML",
    });

    return true;
  }

  private async getFilteredJobs(
    user: User,
    job: Job
  ): Promise<Job | undefined> {
    if (job.status !== "pending") {
      return undefined;
    }

    const userFeeds = await this.prisma.jobFeed.findMany({
      where: { userId: user.id },
    });

    for (const feed of userFeeds) {
      const titleMatches =
        feed.title &&
        job.title.toLowerCase().includes(feed.title.toLowerCase());

      const typeMatches = feed.type === job.type;

      if (titleMatches || typeMatches) {
        const updatedJob = await this.prisma.job.update({
          where: { id: job.id },
          data: {
            status: "approved",
          },
        });

        return updatedJob;
      }
    }

    return undefined;
  }
}
