import { defineConfig } from "@prisma/config";
import * as dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url:
      process.env.DIRECT_URL! ||
      "postgresql://postgres.moppbxflxjwwfrplqaff:321%21Lo3k%23%21123%3F@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres?sslmode=require",
  },
});
