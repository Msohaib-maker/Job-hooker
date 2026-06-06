import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from "@nestjs/common";
import { EmailService } from "./email.service";
import { JwtAuthGuard } from "@/src/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("email")
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post("subscription")
  @HttpCode(HttpStatus.OK)
  async updatePreferences(@Req() req: any) {
    console.log("Subscribing user: ", req.user.email);
    return await this.emailService.subscribe(req.user.email);
  }
}
