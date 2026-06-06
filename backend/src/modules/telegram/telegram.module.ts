import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { TelegramService } from "./telegram.service";
import { TelegramUpdate } from "./telegram.update";
import { TelegramController } from "./telegram.controller";
import { TelegramJobMatcher } from "./telegram.job.matcher";
import { SendController } from "./send.controller";
import { SendService } from "./send.service";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "live.smtp.mailtrap.io",
        port: 587,
        secure: false,
        auth: {
          user: "smtp@mailtrap.io", // Replace with your email
          pass: "9f054724c55dc160d8541b24028cc270", // Replace with your email password or app password
        },
      },
      defaults: {
        from: '"Job Scrapper" <no-reply@job-hookers.com>', // Default "from" email
      },
    }),
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
