// src/feeds/dto/feeds.dto.ts

export class CreateFeedDto {
  title: string;
  exp: string;
  type: "remote" | "on_site"; // or JobType enum if you want
  location: string;
  salary: number;
}
