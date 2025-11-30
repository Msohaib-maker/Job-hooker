const API_BASE_URL = "http://localhost:3000";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "SCRAPE_PAGE") {
    console.log("Received SCRAPE_PAGE message from popup.");

    chrome.cookies.getAll({ domain: "upwork.com" }, async (cookies) => {
      if (!cookies.length) {
        console.log("No cookies found for upwork.com");
        sendResponse({ success: false, message: "No cookies found" });
        return;
      }

      // Get the latest cookie by expiration date
      const latest = cookies.reduce((a, b) =>
        (a.expirationDate || 0) > (b.expirationDate || 0) ? a : b
      );

      const payload = {
        name: latest.name,
        value: latest.value,
        domain: latest.domain,
        path: latest.path,
        expires: latest.expirationDate
          ? new Date(latest.expirationDate * 1000).toISOString()
          : null,
        httpOnly: latest.httpOnly,
        secure: latest.secure,
        sameSite: latest.sameSite || "Lax",
        userId: "ext-" + crypto.randomUUID(), // extension-generated user ID
      };

      console.log("Sending latest cookie to backend:", payload);

      try {
        const res = await fetch(`${API_BASE_URL}/cookies`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log("Saved cookie:", data);
        sendResponse({ success: true, data });
      } catch (err) {
        console.error("Failed to send cookie:", err);
        sendResponse({ success: false, error: err.message });
      }
    });

    // keep the message channel open for async sendResponse
    return true;
  }
});
