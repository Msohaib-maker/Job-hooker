import { Injectable } from "@nestjs/common";
import puppeteer, { Browser, Page } from "puppeteer";
import { indeedSearchUrl, Roles } from "./constants/search-links";
import { scrapeDOM } from "../scraper/utils/html.utils";
import {
  findNodesWithChild,
  findNodesWithNumbers,
  scrapeIndeedJobs,
} from "./utils/dom-scrapper-utils";
import { clickJobCard } from "./utils/dom-puppeter-utils";
import { ProxyRotator } from "../../classes/proxy-rotator";

@Injectable()
export class IndeedScraper {
  rotator = new ProxyRotator();
  currentProxyAuth: { username: string; password: string } | null = null;

  async awaken() {
    return await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        // `--proxy-server=${host}:${port}`,
      ],
    });
  }

  async configPage(browser: Browser): Promise<Page> {
    const page = await browser.newPage();

    // if (this.currentProxyAuth) {
    //   await page.authenticate({
    //     username: this.currentProxyAuth.username,
    //     password: this.currentProxyAuth.password,
    //   });
    // }
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => false });
      Object.defineProperty(navigator, "platform", { get: () => "Win32" });
      Object.defineProperty(navigator, "languages", {
        get: () => ["en-US", "en"],
      });
    });

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
        "AppleWebKit/537.36 (KHTML, like Gecko) " +
        "Chrome/116.0.5845.188 Safari/537.36"
    );

    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const url = req.url();

      if (
        url.endsWith(".png") ||
        url.endsWith(".jpg") ||
        url.endsWith(".jpeg") ||
        url.endsWith(".gif") ||
        url.endsWith(".css") ||
        url.endsWith(".woff") ||
        url.endsWith(".woff2") ||
        url.endsWith(".ttf")
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    return page;
  }

  async scrape(browser: Browser) {
    const page = await this.configPage(browser);
    await page.goto(
      `${indeedSearchUrl}?q=${Roles.SOFTWARE_ENGINEER}&l=Remote`,
      { waitUntil: "domcontentloaded", timeout: 60000 }
    );

    const results: any[] = [];

    let currentPage = 1;
    const MAX_PAGES = 1;

    while (currentPage <= MAX_PAGES) {
      console.log(`📄 Scraping page ${currentPage}`);

      const tree = await scrapeIndeedJobs(page);
      const searchResults = await this.getJobs(page, tree);
      results.push(...searchResults);

      if (currentPage >= MAX_PAGES) break;

      const numberNodes = findNodesWithNumbers(tree);
      const nextPageNode = numberNodes.find(
        (n) => n.text === String(currentPage + 1)
      );

      if (!nextPageNode) {
        break;
      }
      await this.safeClickAndWait(page, String(currentPage + 1));

      currentPage++;
    }

    return results.flat();
  }

  async safeClickAndWait(page: Page, text: string) {
    try {
      await page.evaluate((txt) => {
        const links = [...document.querySelectorAll("a")];
        const link = links.find((x) => x.textContent.trim() === txt);
        if (link) link.click();
      }, text);

      await page.waitForFunction(() => document.readyState === "complete", {
        timeout: 15000,
      });

      await new Promise((r) => setTimeout(r, 1500));
    } catch (err) {
      console.warn(`⚠️ Warning: navigation did not complete for page ${text}`);
      await new Promise((r) => setTimeout(r, 1500));
    }
  }

  async getJobs(page: Page, tree: any) {
    const jobLinkNodes = findNodesWithChild(
      tree,
      { tag: "h2", classContains: "jobTitle" },
      { tag: "a", classContains: "jcs-JobTitle" }
    );
    const result: any[] = [];
    for (const jobLinkNode of jobLinkNodes) {
      const job = await clickJobCard(page, jobLinkNode);
      result.push(job);
    }

    return result;
  }
}
