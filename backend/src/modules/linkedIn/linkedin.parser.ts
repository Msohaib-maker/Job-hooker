import { Injectable } from "@nestjs/common";
import { Page } from "puppeteer";
import { Feed } from "../scraper/interfaces/feed.interface";
import { Timeout } from "@nestjs/schedule";
import {
  clickElement,
  scrapeDOM,
  waitForElement,
} from "../scraper/utils/html.utils";
import {
  LinkedinSelectors,
  LinkedinSelectorsType,
} from "../scraper/constants/common-selectors";

@Injectable()
export class LinkedinParser {
  async extractFeed(page: Page): Promise<any> {
    const jobIds = await page.evaluate(() => {
      const jobs = document.querySelectorAll("li[data-occludable-job-id]");
      return Array.from(jobs).map((li) =>
        li.getAttribute("data-occludable-job-id")
      );
    });
    const results = await this.extractJobDetails(page, jobIds);
    return { Jobs: results };
  }

  async extractJobDetails(page: Page, jobIds: any[]) {
    const results = [];

    for (const jobId of jobIds) {
      await clickElement(page, `li[${LinkedinSelectors.jobId}="${jobId}"]`);
      await waitForElement(page, "article.jobs-description__container");
      const jobData = await this.pageEvaluator(page, LinkedinSelectors);

      results.push({ jobId, ...jobData });
      await new Promise((res) => setTimeout(res, 500));
    }

    return results;
  }

  private async pageEvaluator(
    page: Page,
    selectors: LinkedinSelectorsType
  ): Promise<{ title: string; text: string }> {
    const jobDetails = await page.evaluate((selectors) => {
      function getInnerText(element: Element) {
        return element ? (element.textContent || "").trim() : "";
      }

      const titleElement = document.querySelector(selectors.jobTitle);
      const title = getInnerText(titleElement);

      const article = document.querySelector(selectors.descriptionContainer);
      if (!article) return { title: title, text: "" };

      let text = "";

      if (article) {
        // Select all divs and paragraphs inside the article
        const elements = article.querySelectorAll("div, p, li, span");
        elements.forEach((el) => {
          const t = el.textContent?.trim();
          if (t) text += t + " ";
        });
        text = text.replace(/\s+/g, " ").trim();
      }

      return {
        title: title,
        text: text,
      };
    }, selectors);

    return jobDetails;
  }
}
