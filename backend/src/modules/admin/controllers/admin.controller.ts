import { AdminGuard } from "@/src/guards/admin-guard";
import { JobBody } from "@/src/models/job-model";
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AdminService } from "../services/admin.service";

@UseGuards(AdminGuard)
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("jobs")
  async createJobs(@Body() body: JobBody) {
    return await this.adminService.postJobs(body);
  }
}
