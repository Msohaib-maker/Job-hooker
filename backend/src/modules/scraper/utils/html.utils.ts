import { Page, ElementHandle } from "puppeteer";
import { ScrapedNode } from "../interfaces/job.interface";

/**
 * Wait for an element and return its ElementHandle, or null if not found
 */
export async function waitForElement(
  page: Page,
  selector: string,
  timeout = 5000
): Promise<ElementHandle<Element> | null> {
  try {
    await page.waitForSelector(selector, { timeout });
    return await page.$(selector);
  } catch {
    return null;
  }
}

/**
 * Get trimmed text content from a selector
 */
export async function getText(page: Page, selector: string): Promise<string> {
  const el = await page.$(selector);
  if (!el) return "";
  return await el.evaluate((node) => node.textContent?.trim() || "");
}

/**
 * Get attribute value from a selector
 */
export async function getAttr(
  page: Page,
  selector: string,
  attr: string
): Promise<string | null> {
  const el = await page.$(selector);
  if (!el) return null;
  return await el.evaluate((node, attr) => node.getAttribute(attr), attr);
}

/**
 * Get an array of trimmed text content from multiple elements
 */
export async function getTextsArray(
  page: Page,
  selector: string
): Promise<string[]> {
  return await page.$$eval(selector, (els) =>
    els.map((el) => el.textContent?.trim() || "")
  );
}

/**
 * Click an element safely, returns true if clicked, false if not found
 */
export async function clickElement(
  page: Page,
  selector: string,
  timeout = 5000
): Promise<boolean> {
  const el = await waitForElement(page, selector, timeout);
  if (!el) return false;
  await el.click();
  return true;
}

/**
 * Automatically scroll the page to the bottom
 */
export async function autoScroll(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

export async function scrapeDOM(page: Page): Promise<ScrapedNode[]> {
  const domList = await page.evaluate(() => {
    const all = [...document.querySelectorAll("*")];

    function getUniqueSelector(el) {
      if (el.id) return `#${el.id}`;
      const names = [];
      while (el.parentElement) {
        let name = el.tagName.toLowerCase();
        if (el.className) {
          name += "." + el.className;
        }
        const siblings = Array.from(el.parentElement.children);
        const index = siblings.indexOf(el);
        name += `:nth-child(${index + 1})`;
        names.unshift(name);
        el = el.parentElement;
      }
      return names.join(" > ");
    }
    return all.map((el) => ({
      tag: el.tagName.toLowerCase(),
      text: el.textContent?.trim() || "",
      selector: getUniqueSelector(el),
      attributes: Object.fromEntries(
        [...el.attributes].map((a) => [a.name, a.value])
      ),
    }));
  });

  return domList;
}
