import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Job } from "@/src/models/job-model";

@Injectable()
export class LinkedinRepository {
  constructor(private prisma: PrismaService) {}

  create(data: Job) {
    return this.prisma.job.create({ data });
  }
}
