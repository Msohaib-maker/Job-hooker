import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret:
        process.env.JWT_SECRET ||
        "62648923a5ff83a9f59a222e5fb28a82b6b5b599b465cdf1e93fa84b5adad6c58060a8f59a1f2c384ace7b98ea7f1422253903513528c3787a92f6faa5140159",
      signOptions: { expiresIn: "30d" },
    }),
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
