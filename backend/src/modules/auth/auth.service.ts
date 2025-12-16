// auth.service.ts
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { SignUpDto, LoginDto } from "./models/register-dto";
import { randomBytes, createHash } from "crypto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signUp(dto: SignUpDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const rawToken = randomBytes(32).toString("hex");
    const hashedToken = createHash("sha256").update(rawToken).digest("hex");

    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
        emailVerified: false,
        emailVerificationToken: hashedToken,
        emailVerificationExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    // await this.mailService.sendVerificationEmail(user.email, rawToken);

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { token };
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

  async validateUser(userId: number) {
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
