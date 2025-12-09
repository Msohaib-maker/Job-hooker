// src/feeds/feeds.service.ts

import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@/src/models/user-model";

@Injectable()
export class TelegramService {
  constructor(private prisma: PrismaService) {}

  async sendCode(code: string, user: User) {
    console.log(code);

    await this.prisma.user.update({
      where: { email: user.email },
      data: {
        telegram_one_time_code: code,
      },
    });
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
}
