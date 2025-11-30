import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import puppeter, { HTTPResponse } from "puppeteer";
import { LinkedinJobsScraper } from "../linkedIn/linkedin.jobs";

const EMAIL = "sohaibrobot22@gmail.com";
const PASSWORD = "&dL$Jp&i4A5g!**";
const COOKIES: any[] = [];

type Feed = {
  sections: any[];
  divs: any[];
  paragraphs: any[];
};
@Injectable()
export class JobsService {
  EMAIL = "sohaibrobot22@gmail.com";
  PASSWORD = "&dL$Jp&i4A5g!**";
  private readonly logger = new Logger(JobsService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly jobService: LinkedinJobsScraper
  ) {}

  async scrapeUpwork(domain: string, userId: string) {
    const cookies = await this.prisma.cookie.findMany({
      where: { domain, userId },
    });

    if (!cookies.length)
      throw new Error("No cookies found for this user/domain"); // 2. Launch Puppeteer

    const browser = await puppeter.launch({
      // ⭐ Use 'new' for the modern, less detectable headless mode
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled",
        "--disable-dev-shm-usage",
        // Add this to ensure a large, human-like viewport in headless mode
        "--start-maximized",
      ],
    });
    const page = await browser.newPage(); // 3. Set cookies in the browser

    await page.setCookie(
      ...cookies.map((c) => ({
        name: c.name,
        value: c.value,
        domain: c.domain,
        path: c.path || "/",
        httpOnly: c.httpOnly,
        secure: c.secure,
      }))
    ); // 4. Go to Upwork jobs page

    await page.goto("https://www.upwork.com/nx/search/jobs/", {
      waitUntil: "networkidle2",
    }); // wait for the main job container elements to render

    const jobTileSelector = "article[data-test='JobTile']";
    await page.waitForSelector(jobTileSelector, {
      timeout: 60000,
    }); // 5. Scrape all data from each job tile

    const jobs = await page.$$eval(jobTileSelector, this.filterJobs);

    this.logger.log(`Scraped ${jobs.length} jobs`);

    await this.prisma.job.createMany({
      data: jobs
        .filter((j) => j.title && j.url) // Only insert if we have a title and URL
        .map((j) => ({ title: j.title, url: j.url, status: "new" })),
    });

    await browser.close();
    return { count: jobs.length, jobs };
  }

  async scrapeEndPoint() {
    const browser = await puppeter.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    );

    const apiUrls = [];
    page.on("request", (request) => {
      const url = request.url();
      const resourceType = request.resourceType(); // document, xhr, script...
      if (resourceType === "xhr" || resourceType === "fetch") {
        console.log("API Request:", url);
        apiUrls.push(url);
      }
    });

    await page.goto("https://www.upwork.com/freelance-jobs/", {
      waitUntil: "networkidle2",
    });

    setTimeout(async () => {
      if (!page.isClosed()) {
        await page.close();
        console.log("Page closed after timeout");
      }
      await browser.close(); // If you want to close the browser as well
    }, 8000);

    return apiUrls;
  }

  async scrapeLinkedin() {
    const browser = await puppeter.launch({ headless: false });
    const page = await browser.newPage();

    // 1️⃣ Check if cookies exist in memory
    if (COOKIES.length) {
      console.log("⚡ Cookies found, setting them...");
      await page.setCookie(...COOKIES);

      try {
        await page.goto("https://www.linkedin.com/feed/", {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        });

        // Optional: force reload to ensure session is recognized
        await page.reload({ waitUntil: "domcontentloaded" });
      } catch (err) {
        console.warn("⚠️ Feed navigation failed, trying to continue anyway...");
      }
    } else {
      // 2️⃣ No cookies → login flow
      console.log("⚠️ No cookies found, logging in...");

      await page.goto("https://www.linkedin.com/login", {
        waitUntil: "networkidle2",
      });

      // Fill login form automatically
      await page.type('input[name="session_key"]', EMAIL, { delay: 100 });
      await page.type('input[name="session_password"]', PASSWORD, {
        delay: 100,
      });

      await page.click('button[type="submit"]');

      // Wait for feed to load
      try {
        await Promise.race([
          page.waitForNavigation({
            waitUntil: "domcontentloaded",
            timeout: 120000,
          }),
          page.waitForSelector("nav", { timeout: 120000 }),
        ]);
      } catch (err) {
        console.warn("⚠️ Login navigation took too long, continuing anyway...");
      }

      // Save cookies in memory
      const cookies = await page.cookies();
      COOKIES.push(...cookies);
      console.log("✅ Logged in and cookies stored in memory!");
    }

    // 3️⃣ Now we are on the feed, wait for main content
    await page.waitForSelector("div.feed-shared-update-v2", {
      timeout: 120000,
    });

    const result: Feed = await page.evaluate(() => {
      const mains = Array.from(document.querySelectorAll("main"));

      // Prepare separate lists
      const sections = [];
      const divs = [];
      const paragraphs = [];

      // Loop through each <main> element and extract child elements
      mains.forEach((main) => {
        sections.push(...Array.from(main.querySelectorAll("section")));
        divs.push(...Array.from(main.querySelectorAll("div")));
        paragraphs.push(...Array.from(main.querySelectorAll("p")));
      });

      // You can return innerHTML or textContent depending on what you need
      return {
        sections: sections.map((el) => el.innerText.trim()),
        divs: divs.map((el) => el.innerText.trim()),
        paragraphs: paragraphs.map((el) => el.innerText.trim()),
      };
    });

    await browser.close();
    console.log(`result.divs.length ${result.divs.length}`);
    console.log(`result.paragraphs.length ${result.paragraphs.length}`);
    console.log(`result.sections.length ${result.sections.length}`);

    return {
      divs: result.divs.slice(10, 30),
    };
  }

  async scrapeLinkedinJobs() {
    return this.jobService.scrape(this.EMAIL, this.PASSWORD);
  }

  private filterJobs(jobTiles: HTMLElement[]): {
    title: string;
    url: string;
    type: any;
    experience: any;
    description: string[];
    tags: string[];
    rate_or_budget_info: any;
  }[] {
    const getText = (tile, selector) =>
      tile.querySelector(selector)?.textContent?.trim() ?? null; // Function to get all tokens/tags

    const getTags = (tile) => {
      const tagElements = tile.querySelectorAll(
        ".air3-token-container button span"
      );
      return Array.from(tagElements)
        .map((el) => {
          // Type assertion: Tell TypeScript that 'el' is an 'Element'
          // and therefore has the 'textContent' property.
          const element = el as Element;
          return element.textContent?.trim() ?? null;
        })
        .filter((tag) => tag && tag !== "+1" && tag !== "+2"); // Filter out nulls and extra counts
    };

    return jobTiles.map((tile) => {
      const titleLink = tile.querySelector(
        "a[data-test='job-tile-title-link']"
      );
      const jobType = getText(tile, "li[data-test='job-type-label'] strong");
      const experience = getText(
        tile,
        "li[data-test='experience-level'] strong"
      ); // The main job description text is inside a nested paragraph
      const description = getText(tile, "div[data-test='JobDescription'] p");

      return {
        title: titleLink?.textContent?.trim() ?? null,
        url: titleLink?.getAttribute("href") ?? null,
        type: jobType,
        experience: experience,
        description: description,
        tags: getTags(tile),
        rate_or_budget_info: getText(tile, "li:nth-child(1) strong"),
      };
    });
  }
}
