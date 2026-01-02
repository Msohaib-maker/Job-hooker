// telegram.formatter.ts
import { Job } from "@prisma/client";

export class TelegramFormatter {
  static formatJob(job: Job): string {
    const lines: string[] = [];

    // Title
    lines.push(`💼 <b>${job.title}</b>`);
    lines.push("");

    // Company
    if (job.company) {
      lines.push(`🏢 ${job.company}`);
    }

    // Location + type
    const locationLine: string[] = [];
    if (job.location) {
      locationLine.push(`📍 ${job.location}`);
    }
    if (job.type) {
      const typeEmoji =
        {
          remote: "🏠",
          hybrid: "🔄",
          onsite: "🏢",
        }[job.type] || "💼";

      locationLine.push(
        `${typeEmoji} ${job.type.charAt(0).toUpperCase() + job.type.slice(1)}`
      );
    }
    if (locationLine.length) {
      lines.push(locationLine.join(" • "));
    }

    // Salary + experience (same line)
    const metaLine: string[] = [];
    if (job.salary) {
      const salary = new Intl.NumberFormat("en-US").format(job.salary);
      metaLine.push(`💰 ${salary} ${job.salaryCurrency}`);
    }
    if (job.experience) {
      metaLine.push(`📊 ${job.experience}`);
    }
    if (metaLine.length) {
      lines.push("");
      lines.push(metaLine.join("   •   "));
    }

    // Divider
    lines.push("");
    lines.push("━━━━━━━━━━━━━━━━");
    lines.push("");

    // Description
    if (job.description) {
      lines.push(`📝 <b>What you’ll do</b>`);
      lines.push(job.description.trim());
      lines.push("");
    }

    // Tags
    if (job.tags?.trim()) {
      const tags = job.tags
        .split(",")
        .map((tag) => `#${tag.trim().replace(/\s+/g, "_")}`)
        .join(" ");
      lines.push(`🏷 ${tags}`);
      lines.push("");
    }

    // CTA
    if (job.url || job.contactEmail) {
      lines.push("━━━━━━━━━━━━━━━━");
      lines.push("");
      if (job.url) {
        lines.push(`👉 <b><a href="${job.url}">Apply Now</a></b>`);
      }
      if (job.contactEmail) {
        lines.push(`📧 ${job.contactEmail}`);
      }
    }

    // Posted date
    const postedDate = new Date(job.creation).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    lines.push("");
    lines.push(`📅 Posted: ${postedDate}`);

    return lines.join("\n");
  }

  // Alternative: More compact version
  static formatJobCompact(job: Job): string {
    const parts: string[] = [];

    // Title and company
    parts.push(`💼 <b>${job.title}</b>`);
    if (job.company) {
      parts.push(`at <b>${job.company}</b>`);
    }
    parts.push("\n");

    // Quick info line
    const quickInfo: string[] = [];
    if (job.location) quickInfo.push(`📍 ${job.location}`);
    if (job.type) {
      const typeEmoji = { remote: "🏠", hybrid: "🔄", onsite: "🏢" }[job.type];
      quickInfo.push(`${typeEmoji} ${job.type}`);
    }
    if (job.salary) {
      quickInfo.push(
        `💰 ${new Intl.NumberFormat("en-US").format(job.salary)} ${job.salaryCurrency}`
      );
    }
    if (job.experience) quickInfo.push(`📊 ${job.experience}`);

    parts.push(quickInfo.join(" • "));
    parts.push("\n");

    // Description (truncated if too long)
    if (job.description) {
      const maxLength = 200;
      const desc =
        job.description.length > maxLength
          ? job.description.substring(0, maxLength) + "..."
          : job.description;
      parts.push(desc);
      parts.push("\n");
    }

    // Tags
    if (job.tags && job.tags.trim()) {
      const tagsList = job.tags
        .split(",")
        .map((tag) => `#${tag.trim().replace(/\s+/g, "_")}`)
        .join(" ");
      parts.push(`\n🏷 ${tagsList}`);
    }

    // Apply link
    if (job.url) {
      parts.push(`\n\n🔗 <a href="${job.url}">Apply Now</a>`);
    }

    return parts.join("");
  }

  // For sending multiple jobs in a list
  static formatJobList(jobs: Job[]): string {
    if (jobs.length === 0) {
      return "❌ No jobs found matching your criteria.";
    }

    const header = `📋 <b>Found ${jobs.length} Job${jobs.length > 1 ? "s" : ""}</b>\n\n`;

    const jobItems = jobs
      .map((job, index) => {
        const salary = job.salary
          ? `💰 ${new Intl.NumberFormat("en-US").format(job.salary)} ${job.salaryCurrency}`
          : "💰 Not specified";

        const location = job.location || "Remote";
        const type = job.type ? `(${job.type})` : "";

        return `${index + 1}. <b>${job.title}</b>\n   ${job.company || "Company not listed"}\n   📍 ${location} ${type}\n   ${salary}`;
      })
      .join("\n\n");

    return header + jobItems;
  }

  // With inline keyboard buttons (for Telegram bots)
  static formatJobWithButtons(job: Job): { text: string; buttons: any[] } {
    const text = this.formatJob(job);

    const buttons = [];

    if (job.url) {
      buttons.push([{ text: "🔗 Apply Now", url: job.url }]);
    }

    if (job.contactEmail) {
      buttons.push([
        { text: "📧 Contact via Email", url: `mailto:${job.contactEmail}` },
      ]);
    }

    buttons.push([
      { text: "❤️ Save", callback_data: `save_${job.id}` },
      { text: "📤 Share", callback_data: `share_${job.id}` },
    ]);

    return { text, buttons };
  }
}
