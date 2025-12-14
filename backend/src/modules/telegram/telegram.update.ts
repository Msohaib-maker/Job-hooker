import { Update, Start, Ctx, On } from "nestjs-telegraf";
import { Context } from "telegraf";
import { TelegramService } from "./telegram.service";

@Update()
export class TelegramUpdate {
  constructor(private telegramService: TelegramService) {}

  private extractCode = (text: string) => {
    const parts = text.trim().split(/\s+/);
    return parts[1] || null; // second part after "/start"
  };

  @Start()
  async onStart(@Ctx() ctx: Context) {
    const message = ctx.message;
    const chatId = message.chat.id;
    if ("text" in message) {
      const code = this.extractCode(message.text);
      console.log(code);
      if (this.extractCode(message.text) === null) return;
      const users = await this.telegramService.updateChatId(
        chatId.toString(),
        code
      );
      console.log(users);
    }
  }

  @On("message")
  onAnyMessage(@Ctx() ctx: Context) {
    const message = ctx.message;
    console.log(message);
    ctx.reply("I don't understand");
  }
}
