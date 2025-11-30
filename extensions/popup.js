document.getElementById("scrapeBtn").addEventListener("click", () => {
  const statusEl = document.getElementById("status");
  statusEl.textContent = "Scraping...";
  statusEl.className = "status";

  chrome.runtime.sendMessage({ action: "SCRAPE_PAGE" }, (response) => {
    if (response?.success) {
      statusEl.textContent = "✅ Cookie sent successfully!";
      statusEl.classList.add("success");
    } else {
      statusEl.textContent = "❌ Failed to send cookie.";
      statusEl.classList.add("error");
    }
  });
});
