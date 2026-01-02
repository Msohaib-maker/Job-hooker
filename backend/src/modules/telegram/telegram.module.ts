import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { TelegramService } from "./telegram.service";
import { TelegramUpdate } from "./telegram.update";
import { TelegramController } from "./telegram.controller";
import { TelegramJobMatcher } from "./telegram.job.matcher";
import { SendController } from "./send.controller";
import { SendService } from "./send.service";

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN,
      launchOptions: {
        dropPendingUpdates: true,
      },
    }),
  ],
  providers: [TelegramService, TelegramUpdate, TelegramJobMatcher, SendService],
  controllers: [TelegramController, SendController],
})
export class TelegramModule {}
