import { Module } from "@nestjs/common";
import { AdminJobService } from "./services/job.service";
import { AdminService } from "./services/admin.service";
import { AdminController } from "./controllers/admin.controller";

@Module({
  providers: [AdminJobService, AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
