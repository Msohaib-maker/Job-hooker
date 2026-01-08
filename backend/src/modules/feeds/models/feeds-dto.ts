// src/feeds/dto/feeds.dto.ts

import { User } from "@/src/models/user-model";

export class FeedDto {
  title: string;
  exp: string;
  type: "remote" | "on_site"; // or JobType enum if you want
  location: string;
  salary: number;
  salaryCurrency: string;
  tags: string;
  salaryType: "Fixed" | "Hourly";
  platforms: string;

  // userId: number | null;
  // user: User | null;
}
