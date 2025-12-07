import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-role",
      "x-pass",
      "Accept",
      "Origin",
      "User-Agent",
      "Sec-Fetch-Site",
      "Sec-Fetch-Mode",
      "Sec-Fetch-Dest",
    ],
  });

  await app.listen(3000);
}
bootstrap();
