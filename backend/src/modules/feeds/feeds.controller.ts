// src/feeds/feeds.controller.ts

import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  InternalServerErrorException,
} from "@nestjs/common";
import { FeedsService } from "./feeds.service";
import { FeedDto } from "./models/feeds-dto";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";
import { EmailVerifiedGuard } from "@/src/guards/email-verify.guard";

@UseGuards(JwtAuthGuard)
@Controller("feeds")
export class FeedsController {
  constructor(private feedsService: FeedsService) {}

  @Post()
  createFeed(@Body() dto: FeedDto, @Request() req: any) {
    console.log("feed created ... ");
    return this.feedsService.createFeed(dto, req.user.email);
  }

  @Get("me")
  getMyFeeds(@Request() req: any) {
    console.log("Get all feeds ...");
    const userId = Number(req.user.id);
    return this.feedsService.getMyFeeds(userId);
  }

  @Delete(":id")
  deleteFeed(@Param("id") id: string, @Request() req) {
    return this.feedsService.deleteFeed(Number(id), req.user.id);
  }

  @Post("update/:id")
  updateFeed(@Param("id") id: number, @Body() body: FeedDto, @Request() req) {
    console.log("feed updated", typeof id);
    try {
      return this.feedsService.updateFeed(Number(id), body, req.user.id);
    } catch {
      throw new InternalServerErrorException("Oops!! Something went wrong");
    }
  }
}
