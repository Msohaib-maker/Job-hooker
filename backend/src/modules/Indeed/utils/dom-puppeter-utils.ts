import { Page } from "puppeteer";

export async function clickJobCard(
  page: Page,
  node: any
): Promise<{ title: string; description: string }> {
  try {
    if (!node || !node.path) {
      // no valid node
      return { title: "", description: "" };
    }

    const selector = node.path;

    // Wait for the element (fail silently)
    await page.waitForSelector(selector, { timeout: 7000 }).catch(() => {});

    // Scroll into view
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ behavior: "auto", block: "center" });
    }, selector);

    // Click the element
    await page.click(selector).catch(() => {});

    // Wait for job panel
    await page
      .waitForSelector("#jobDescriptionText", { timeout: 15000 })
      .catch(() => {});

    // Extract job description
    const jobText = await page
      .$eval("#jobDescriptionText", (el) => el.textContent)
      .catch(() => null);

    return {
      title: node.text || "",
      description: jobText || "",
    };
  } catch (err) {
    // If anything else fails, return empty
    return { title: "", description: "" };
  }
}
