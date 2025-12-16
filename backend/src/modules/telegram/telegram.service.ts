// src/feeds/feeds.service.ts

import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@/src/models/user-model";
import { InjectBot } from "nestjs-telegraf";
import { Telegraf } from "telegraf";
import { Job } from "@/src/models/job-model";

@Injectable()
export class TelegramService {
  constructor(
    private prisma: PrismaService,
    @InjectBot() private bot: Telegraf
  ) {}

  async sendCode(code: string, user: User) {
    console.log(code);

    await this.prisma.user.update({
      where: { email: user.email },
      data: {
        telegram_one_time_code: code,
      },
    });
  }

  async getConnection(email: string) {
    const dbUser = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!dbUser || !dbUser.telegram_handle) {
      return { connect: false };
    }
    return { connect: true };
  }

  async updateChatId(chatId: string, uniqueCode: string) {
    try {
      return await this.prisma.user.update({
        where: { telegram_one_time_code: uniqueCode },
        data: { telegram_handle: chatId, telegram_one_time_code: null },
      });
    } catch (e) {
      if (e.code === "P2025") {
        console.log("No user found with this code");
        return null;
      }
      throw e;
    }
  }

  async sendMessage(userId: string, job: string) {
    try {
      await this.bot.telegram.sendMessage(userId, job, {
        parse_mode: "HTML",
      });
    } catch (err) {
      console.error("Telegram sendMessage error:", err);
    }
  }
}
