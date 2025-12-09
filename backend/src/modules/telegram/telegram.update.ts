import { Update, Start, Ctx } from "nestjs-telegraf";
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
      console.log(this.extractCode(message.text));
      const code = this.extractCode(message.text);
      const users = await this.telegramService.updateChatId(
        chatId.toString(),
        code
      );
      console.log(users);
    }

    // Check if user clicked /start <code>
    // const text = message.;
    // const parts = text.split(" ");

    // if (parts.length > 1) {
    //   const code = parts[1];  // your OTP
    //   await this.telegramService.sendCode(chatId, code);

    //   await ctx.reply("Telegram is successfully connected!");
    // } else {
    //   await ctx.reply("Welcome! Please open app to connect.");
    // }
  }
}
