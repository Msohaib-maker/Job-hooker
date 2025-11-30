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
} from "@nestjs/common";
import { FeedsService } from "./feeds.service";
import { CreateFeedDto } from "./models/feeds-dto";
import { JwtAuthGuard } from "../../guards/jwt-auth.guard";

@Controller("feeds")
export class FeedsController {
  constructor(private feedsService: FeedsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createFeed(@Body() dto: CreateFeedDto, @Request() req: any) {
    return this.feedsService.createFeed(dto, req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  getMyFeeds(@Request() req: any) {
    return this.feedsService.getMyFeeds(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  deleteFeed(@Param("id") id: string, @Request() req) {
    return this.feedsService.deleteFeed(Number(id), req.user.userId);
  }
}
