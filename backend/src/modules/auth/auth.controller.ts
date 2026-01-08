// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Query,
  BadRequestException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto, LoginDto, VerifyOtpDto } from "./models/register-dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup/emailVerify")
  emailVerify(@Body() dto: SignUpDto) {
    console.log("email verify...");
    return this.authService.emailVerify(dto);
  }

  @Post("signup/otpVerify")
  otpVerify(@Body() dto: VerifyOtpDto) {
    console.log("otp verify...");
    return this.authService.verifyEmailOtp(dto);
  }

  @Post("login")
  login(@Body() dto: LoginDto) {
    console.log(dto);
    return this.authService.login(dto);
  }

  @Get()
  pingFunction() {
    console.log(process.env.DATABASE_URL);
    console.log(process.env.DIRECT_URL);
    return { db: process.env.DATABASE_URL, direct: process.env.DIRECT_URL };
  }

  @Post("verify-email")
  async verifyEmail(@Query("token") token: string) {
    if (!token) throw new BadRequestException("Token is required");

    return this.authService.verifyEmail(token);
  }
}
