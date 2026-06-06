import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from "@nestjs/common";
// import { MailerService } from "@nestjs-modules/mailer"; // Use your existing module!
import { PrismaService } from "../prisma/prisma.service";

// interface JobFeedPreference {
//   id: string;
//   userEmail: string;
//   keywords: string[];
//   minSalary: number;
//   jobType: string[];
//   lastSentAt: Date;
// }

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  // Inject NestJS's built-in mailer service
  constructor(
    // private readonly mailerService: MailerService,
    private prisma: PrismaService
  ) {}

  public async subscribe(email: string) {
    try {
      this.logger.log(`Checking subscription status for: ${email}`);

      // Check if the user exists in the database
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        // If the user does not exist, log and return an error
        this.logger.warn(`User with email ${email} not found.`);
        return { success: false, message: "User not found." };
      }

      // Toggle the `isEmailSubscription` field
      const updatedSubscriptionStatus = !user.IsEmailSubscription;
      user.IsEmailSubscription = updatedSubscriptionStatus;

      // Save the updated user back to the database
      await this.prisma.user.update({
        where: { email },
        data: { IsEmailSubscription: updatedSubscriptionStatus },
      });

      // Log the updated status
      this.logger.log(
        `Updated subscription status for ${email}: ${updatedSubscriptionStatus ? "Subscribed" : "Unsubscribed"}`
      );

      return {
        success: true,
        subsciption: updatedSubscriptionStatus,
        message: `Subscription status updated to ${updatedSubscriptionStatus ? "Subscribed" : "Unsubscribed"}.`,
      };
    } catch (error) {
      this.logger.error(
        `Failed to update subscription for ${email}: ${error.message}`
      );
      throw new InternalServerErrorException(
        "Failed to update subscription status."
      );
    }
  }

  /**
   * Automated matching and email distribution pipeline via Nodemailer / Mailtrap
   */
  // async processAndDistributeFeeds(): Promise<void> {
  //   this.logger.log("Executing automated Mailtrap matching sequence...");

  //   try {
  //     const activeFeeds: JobFeedPreference[] = [
  //       {
  //         id: "feed_01",
  //         userEmail: "user@example.com",
  //         keywords: ["React", "TypeScript"],
  //         minSalary: 40,
  //         jobType: ["Hourly"],
  //         lastSentAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  //       },
  //     ];

  //     for (const feed of activeFeeds) {
  //       const matchingJobs = [
  //         {
  //           id: "job_a",
  //           title: "Senior React Developer",
  //           company: "Stripe",
  //           salary: 85,
  //           type: "Hourly",
  //         },
  //       ];

  //       if (matchingJobs.length === 0) continue;

  //       // Compile your premium HTML template
  //       const htmlTemplate = this.compileFeedHtmlTemplate(matchingJobs);

  //       // Send using the native NestJS MailerService configuration
  //       await this.mailerService.sendMail({
  //         to: feed.userEmail,
  //         from: '"Job Feeds" <feeds@yourverifieddomain.com>', // Matches your verified domain
  //         subject: `🔥 New Job Matches Found For Your Feed (${matchingJobs.length})`,
  //         html: htmlTemplate,
  //       });

  //       this.logger.log(
  //         `Feed successfully dispatched via Mailtrap SMTP to ${feed.userEmail}`
  //       );
  //     }
  //   } catch (error) {
  //     this.logger.error(
  //       "Failed to dispatch emails through Nodemailer SMTP transporter.",
  //       error.stack
  //     );
  //     throw new InternalServerErrorException("SMTP transmission breakdown.");
  //   }
  // }

  // private compileFeedHtmlTemplate(jobs: any[]): string {
  //   const jobCardsHtml = jobs
  //     .map(
  //       (job) => `
  //     <div style="padding: 16px 0; border-bottom: 1px solid #262626;">
  //       <h3 style="margin: 0 0 6px 0; color: #EDEDED; font-size: 16px; font-weight: 600;">${job.title}</h3>
  //       <p style="margin: 0 0 12px 0; color: #737373; font-size: 13px;">
  //         <strong style="color: #4A90D9;">${job.company}</strong>  ·  $${job.salary}/hr  ·  ${job.type}
  //       </p>
  //       <a href="https://yourplatform.com/jobs/${job.id}" style="color: #C4F029; font-weight: bold; font-size: 13px; text-decoration: none;">View Details →</a>
  //     </div>
  //   `
  //     )
  //     .join("");

  //   return `
  //     <!DOCTYPE html>
  //     <html>
  //       <body style="background-color: #0A0A0A; color: #A1A1AA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; margin: 0;">
  //         <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #151515; border: 1px solid #262626; border-radius: 16px; padding: 32px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3);">
  //           <tr>
  //             <td>
  //               <div style="margin-bottom: 24px;">
  //                 <span style="padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(196,240,41,0.3); text-transform: uppercase; color: #C4F029; font-size: 11px; font-weight: bold; background-color: rgba(196,240,41,0.05); letter-spacing: 1px;">Feeds Pipeline</span>
  //               </div>
  //               <h1 style="color: #EDEDED; font-size: 22px; font-weight: 700; margin: 0 0 8px 0;">Your Daily Curated Job Match</h1>
  //               <p style="color: #A1A1AA; font-size: 14px; margin: 0 0 24px 0; line-height: 1.5;">We evaluated new listings and found positions matching your dynamic search filters:</p>
  //               ${jobCardsHtml}
  //             </td>
  //           </tr>
  //         </table>
  //       </body>
  //     </html>
  //   `;
  // }
}
