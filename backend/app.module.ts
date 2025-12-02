import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { CookiesModule } from "./src/modules/cookies/cookies.module";
import { JobsModule } from "./src/modules/jobs/jobs.module";
import { PrismaModule } from "./src/modules/prisma/prisma.module";
import { ScraperModule } from "./src/modules/scraper/scraper.module";
import { IndeedModule } from "./src/modules/Indeed/indeed.module";
import { ZipRecruiterModule } from "./src/modules/zipcruiter/zipcruiter.module";
import { AdzunaModule } from "./src/modules/adzuna/adzuna.module";
import { AdminModule } from "./src/modules/admin/admin.module";
import { AuthModule } from "./src/modules/auth/auth.module";
import { FeedsModule } from "./src/modules/feeds/feeds.module";
import { JwtStrategy } from "./src/strategies/jwt.strategy";
import { ConfigModule } from "@nestjs/config";

@Module({
  providers: [JwtStrategy],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === "production"
          ? ".env.production"
          : ".env.development",
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    JobsModule,
    CookiesModule,
    ScraperModule,
    IndeedModule,
    ZipRecruiterModule,
    AdzunaModule,
    AdminModule,
    AuthModule,
    FeedsModule,
  ],
})
export class AppModule {}
