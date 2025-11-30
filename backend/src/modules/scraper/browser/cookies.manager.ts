import { Injectable } from "@nestjs/common";
import { Browser, Page } from "puppeteer";

@Injectable()
export class CookiesManager {
  private cookies = [];

  async setCookies(browser: Browser) {
    if (this.cookies.length) {
      await browser.setCookie(...this.cookies);
    }
  }

  async saveCookies(page: Page) {
    const newCookies = await page.cookies();
    this.cookies = newCookies;
  }

  hasCookies(): boolean {
    return this.cookies.length > 0;
  }
}
