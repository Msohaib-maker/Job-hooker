// auth.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { SignUpDto, LoginDto, VerifyOtpDto } from "./models/register-dto";
import { randomBytes, createHash } from "crypto";
import { SupabaseService } from "../supabase/supabase.service";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly supabaseService: SupabaseService
  ) {}

  async emailVerify(dto: SignUpDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      // 2️⃣ User exists → generate JWT
      const token = this.jwtService.sign({
        sub: existingUser.id,
        email: existingUser.email,
      });

      return {
        success: true,
        alreadyRegistered: true,
        token,
      };
    }

    const { error } = await this.supabaseService
      .getClient()
      .auth.signInWithOtp({
        email: dto.email,
      });

    if (error) {
      throw new InternalServerErrorException(
        error.message || "Failed to send verification email"
      );
    }

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  }

  async verifyEmailOtp(dto: VerifyOtpDto) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.verifyOtp({
        email: dto.email,
        token: dto.otp,
        type: "email",
      });

    if (error) {
      throw new BadRequestException(error.message || "Invalid or expired OTP");
    }

    // Optional: user/session info from Supabase
    const user = data.user;

    const prismaUser = await this.prisma.user.create({
      data: {
        id: user.id, // 🔑 Supabase UUID
        email: user.email!,
        password: "randomString",
        emailVerified: true,
        emailVerifiedAt: new Date(),
      },
    });

    const token = this.jwtService.sign({
      sub: prismaUser.id,
      email: prismaUser.email,
    });

    return {
      success: true,
      message: "Email verified successfully",
      token,
      user: {
        id: user?.id,
        email: user?.email,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException("Invalid credentials");

    const token = this.jwtService.sign({ sub: user.id, email: user.email });

    return { token };
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async verifyEmail(token: string) {
    const hashedToken = createHash("sha256").update(token).digest("hex");

    const user = await this.prisma.user.findFirst({
      where: {
        emailVerificationToken: hashedToken,
        emailVerificationExpiresAt: { gt: new Date() },
      },
    });

    if (!user) throw new BadRequestException("Invalid or expired token");

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerifiedAt: new Date(),
        emailVerificationToken: null,
        emailVerificationExpiresAt: null,
      },
    });

    return { message: "Email verified successfully" };
  }
}
