import { Telegraf } from "telegraf";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable, Logger } from "@nestjs/common";
import { TelegramFormatter } from "./formatter/telegram.formatter";
import { InjectBot } from "nestjs-telegraf";
import { Job, User } from "@prisma/client";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class SendService {
  private readonly logger = new Logger(SendService.name);

  constructor(
    private readonly prisma: PrismaService,
    @InjectBot()
    private readonly bot: Telegraf,
    private mailService: MailerService
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

  async sendJobsToEmails() {
    const jobs = await this.lockPendingJobs();
    if (!jobs.length) {
      this.logger.log("No jobs to dispatch via email");
      return;
    }

    const users = await this.getEmailSubscribedUsers();
    if (!users.length) {
      this.logger.warn("No email-subscribed users found");
      return;
    }
    for (const user of users) {
      for (const job of jobs) {
        try {
          const filteredJob = await this.getFilteredJobs(user, job);
          if (!filteredJob) continue;

          const message = this.formatJobForEmail(filteredJob);

          await this.mailService.sendMail({
            from: '"Job Scrapper" <no-reply@job-hookers.com>', // Replace with your email
            to: user.email,
            subject: `New Job Opportunity: ${filteredJob.title}`,
            html: message,
          });

          this.logger.log(`Job ${job.id} sent to user ${user.email} via email`);
        } catch (err) {
          this.logger.error(
            `Failed sending job ${job.id} to user ${user.email} via email`,
            err
          );
        }
      }
    }
  }

  private formatJobForEmail(job: Job): string {
    return `
      <h1 style="color: #333;">${job.title}</h1>
      <p><strong>Type:</strong> ${job.type}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Salary:</strong> ${job.salary} ${job.salaryCurrency}</p>
      <p><strong>Description:</strong></p>
      <p>${job.tags}</p>
    `;
  }

  private async getEmailSubscribedUsers() {
    return this.prisma.user.findMany({
      where: {
        IsEmailSubscription: true,
      },
    });
  }

  // ---------------- PRIVATE METHODS ----------------

  private async lockPendingJobs() {
    return this.prisma.job.findMany({
      where: { status: "pending" },
      take: 5,
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
      const matchTitle = titleMatches(job.title, feed.title);

      const typeMatches = feed.type === job.type;

      if (matchTitle || typeMatches) {
        return job;
      }
    }

    return undefined;
  }
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/);
}

function titleMatches(jobTitle: string, feedTitle: string, minOverlap = 0.5) {
  if (!jobTitle || !feedTitle) return false;

  const jobTokens = normalize(jobTitle);
  const feedTokens = normalize(feedTitle);

  const matches = feedTokens.filter((t) => jobTokens.includes(t));
  return matches.length / feedTokens.length >= minOverlap;
}
