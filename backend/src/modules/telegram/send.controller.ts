import { Controller, Get, Query, UnauthorizedException } from "@nestjs/common";
import { SendService } from "./send.service";

@Controller("telefeed")
export class SendController {
  constructor(private readonly sendService: SendService) {}

  @Get("dispatch")
  async dispatchJobs(@Query("token") token: string) {
    console.log(process.env.CRON_SECRET);
    if (token !== process.env.CRON_SECRET) {
      throw new UnauthorizedException();
    }

    await this.sendService.sendJobsToUsers();

    return { status: "ok" };
  }
}
