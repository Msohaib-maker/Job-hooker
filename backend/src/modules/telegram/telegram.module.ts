import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { TelegramService } from "./telegram.service";
import { TelegramUpdate } from "./telegram.update";
import { TelegramController } from "./telegram.controller";

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: "8381001924:AAEcCAehvhdRUAmsReEtAL20gc2AYWomOgM",
    }),
  ],
  providers: [TelegramService, TelegramUpdate],
  controllers: [TelegramController],
})
export class TelegramModule {}
