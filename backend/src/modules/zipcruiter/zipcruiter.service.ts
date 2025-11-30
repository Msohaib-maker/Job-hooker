import { Injectable } from "@nestjs/common";
import puppeteer, { Browser, Page } from "puppeteer";
import { ProxyRotator } from "../../classes/proxy-rotator";
import {
  extractAllPText,
  findAllByFilter,
  findSubtree,
  scrapeZipRecruiter,
} from "./utils/zipcruiter-utils";
import { findElementsByTag } from "../Indeed/utils/dom-scrapper-utils";
import { Timeout } from "@nestjs/schedule";

@Injectable()
export class ZipRecruiterScrapper {
  rotator = new ProxyRotator();
  currentProxyAuth: { username: string; password: string } | null = null;

  async awaken() {
    return await puppeteer.launch({
      headless: false,
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
    const jobList = [];
    const page = await this.configPage(browser);
    await page.goto(
      `https://www.ziprecruiter.ie/jobs/search?q=software+developer`,
      { waitUntil: "domcontentloaded", timeout: 60000 }
    );
    const tree = await scrapeZipRecruiter(page);
    const ulList = findSubtree(tree, {
      tag: "ul",
      className: "jobList",
    });

    let aList = findAllByFilter(ulList, {
      tag: "a",
      attribute: ["href"],
    });

    for (let i = 0; i < aList.length; i++) {
      const href = aList[i].attributes.href;
      const jobTitle = aList[i].fullText;
      let jobDescription = "";

      try {
        const selector = `a[href="${href}"]`;
        await page.click(selector);
        await page.waitForSelector("div.job-body", { timeout: 10000 });
        const subTree = await scrapeZipRecruiter(page);
        const divTree = findSubtree(subTree, {
          tag: "div",
          className: "job-body",
        });

        jobDescription += extractAllPText(divTree);

        await new Promise((resolve) => setTimeout(resolve, 2000));
        await page.goBack({ waitUntil: "domcontentloaded" });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.log("failed", e.message.slice(0, 10));
      }

      jobList.push({
        title: jobTitle,
        description: jobDescription,
      });
    }

    await page.close();
    return jobList;
  }
}
