import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly config: ConfigService
  ) {}

  private getFrontendUrl(): string {
    const env = this.config.get("NODE_ENV");

    return env === "production"
      ? this.config.get("FRONTEND_PROD_URL")
      : this.config.get("FRONTEND_DEV_URL");
  }

  async sendVerificationEmail(email: string, token: string) {
    const verifyUrl = `${this.getFrontendUrl()}/auth/verify-email?token=${token}`;

    await this.mailer.sendMail({
      to: email,
      subject: "Verify your email",
      html: `
        <div style="font-family: Arial, sans-serif">
          <h2>Email Verification</h2>
          <p>Please verify your email by clicking the button below:</p>
          <a href="${verifyUrl}"
             style="
               display: inline-block;
               padding: 10px 16px;
               background-color: #2563eb;
               color: #fff;
               text-decoration: none;
               border-radius: 6px;
             ">
            Verify Email
          </a>
          <p style="margin-top: 12px; font-size: 12px;">
            This link expires in 24 hours.
          </p>
        </div>
      `,
    });
  }
}
