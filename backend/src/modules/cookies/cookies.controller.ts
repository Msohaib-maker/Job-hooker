import { Controller, Get, Post, Body, Delete, Param } from "@nestjs/common";
import { CookiesService } from "./cookies.service";
import { CookieDto } from "./dto/cookie.dto";

@Controller("cookies")
export class CookiesController {
  constructor(private readonly cookiesService: CookiesService) {}

  @Get(":domain")
  getByDomain(@Param("domain") domain: string) {
    return this.cookiesService.getByDomain(domain);
  }

  @Post()
  setCookie(@Body() cookieData: CookieDto) {
    console.log(cookieData);
    return this.cookiesService.saveCookie(cookieData);
  }

  @Delete(":domain")
  deleteByDomain(@Param("domain") domain: string) {
    return this.cookiesService.deleteByDomain(domain);
  }
}
