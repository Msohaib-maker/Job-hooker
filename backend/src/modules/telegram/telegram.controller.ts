import { JwtAuthGuard } from "@/src/guards/jwt-auth.guard";
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { TelegramService } from "./telegram.service";

@UseGuards(JwtAuthGuard)
@Controller("telegram")
export class TelegramController {
  constructor(private readonly telegramService: TelegramService) {}

  @Post("code")
  sendCode(@Req() req: any, @Body("code") oneTimeCode: string) {
    this.telegramService.sendCode(oneTimeCode, req.user);
  }
}
