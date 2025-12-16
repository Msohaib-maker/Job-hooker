import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { TelegramService } from "./telegram.service";
import { TelegramUpdate } from "./telegram.update";
import { TelegramController } from "./telegram.controller";
import { TelegramScheduler } from "./telegram.scheduler";
import { TelegramJobMatcher } from "./telegram.job.matcher";

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN,
      launchOptions: {
        dropPendingUpdates: true,
      },
    }),
  ],
  providers: [
    TelegramService,
    TelegramUpdate,
    TelegramScheduler,
    TelegramJobMatcher,
  ],
  controllers: [TelegramController],
})
export class TelegramModule {}
