import { Injectable } from "@nestjs/common";
import { Page } from "puppeteer";
import { CookiesManager } from "../scraper/browser/cookies.manager";

@Injectable()
export class LinkedinLogin {
  constructor(private readonly cookiesManager: CookiesManager) {}

  async login(page: Page, email: string, password: string) {
    await page.goto("https://www.linkedin.com/login", {
      waitUntil: "networkidle2",
    });

    await page.type('input[name="session_key"]', email, { delay: 100 });
    await page.type('input[name="session_password"]', password, { delay: 100 });
    await page.click('button[type="submit"]');

    await Promise.race([
      page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 60000 }),
      page.waitForSelector("nav", { timeout: 60000 }),
    ]);

    await this.cookiesManager.saveCookies(page);
  }
}
