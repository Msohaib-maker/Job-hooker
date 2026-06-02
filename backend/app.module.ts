import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { CookiesModule } from "./src/modules/cookies/cookies.module";
import { PrismaModule } from "./src/modules/prisma/prisma.module";
import { AdzunaModule } from "./src/modules/adzuna/adzuna.module";
import { AdminModule } from "./src/modules/admin/admin.module";
import { AuthModule } from "./src/modules/auth/auth.module";
import { FeedsModule } from "./src/modules/feeds/feeds.module";
import { JwtStrategy } from "./src/strategies/jwt.strategy";
import { ConfigModule } from "@nestjs/config";
import { JobModule } from "./src/modules/job/job.module";
import { TelegramModule } from "./src/modules/telegram/telegram.module";
import { SupabaseModule } from "./src/modules/supabase/supabase.module";
import { ExportModule } from "./src/modules/export/export.module";

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
    CookiesModule,
    AdzunaModule,
    AdminModule,
    AuthModule,
    FeedsModule,
    JobModule,
    TelegramModule,
    ExportModule,
  ],
})
export class AppModule {}
