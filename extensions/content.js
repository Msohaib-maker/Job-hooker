// content.js
console.log("Content script loaded on", window.location.href);

// Listen for messages from background
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "DO_SCRAPE") {
    console.log("Scraping the page...");

    // Example scrape: collect job titles on Upwork (simplified)
    const jobs = Array.from(document.querySelectorAll("section")).map((el) => ({
      text: el.innerText.slice(0, 100),
    }));

    // Send scraped data back to background
    chrome.runtime.sendMessage({ action: "SCRAPE_RESULT", data: jobs });
  }
});
