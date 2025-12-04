// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto, LoginDto } from "./models/register-dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get()
  pingFunction() {
    console.log(process.env.DATABASE_URL);
    console.log(process.env.DIRECT_URL);
    return { db: process.env.DATABASE_URL, direct: process.env.DIRECT_URL };
  }
}
