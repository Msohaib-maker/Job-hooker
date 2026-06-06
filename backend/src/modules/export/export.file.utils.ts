import * as PDFKit from "pdfkit";
import { Job } from "@/src/models/job-model";
import {
  Education,
  SkillItem,
  ProfileForm,
  Experience,
  Duration,
} from "./export.types";

export function renderHeader(
  doc: PDFKit.PDFDocument,
  profile: ProfileForm
): void {
  const leftMargin = doc.page.margins.left || 50;
  // 1. Render Name centered
  doc
    .fillColor("#111111")
    .fontSize(24)
    .font("Helvetica-Bold")
    .text(profile.name || "Your Name", { align: "center" });

  doc.moveDown(0.3);

  // Filter out empty options
  const contactItems = [
    profile.email ? { label: "E:", value: profile.email } : null,
    profile.website ? { label: "W:", value: profile.website } : null,
    profile.otherLink ? { label: "L:", value: profile.otherLink } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const ACCENT = "#4A90D9";
  const TEXT = "#444444";
  const ICON = "#888888";
  const SEP = "  ·  ";

  doc.fontSize(9).font("Helvetica");

  // Calculate total width to center the entire contact line properly
  let totalWidth = 0;
  contactItems.forEach((item, i) => {
    totalWidth += doc.widthOfString(item.label) + 3;
    totalWidth += doc.widthOfString(item.value);
    if (i < contactItems.length - 1) {
      totalWidth += doc.widthOfString(SEP);
    }
  });

  // Calculate starting X to center the line
  const pageWidth =
    doc.page.width - doc.page.margins.left - doc.page.margins.right;
  let currentX = doc.page.margins.left + (pageWidth - totalWidth) / 2;
  const currentY = doc.y; // Pin the Y baseline for this inline row

  // 2. Explicitly draw each piece without using 'continued: true'
  contactItems.forEach((item, i) => {
    // Label / Icon Accent
    doc
      .fillColor(ACCENT)
      .text(item.label, currentX, currentY, { lineBreak: false });
    currentX += doc.widthOfString(item.label) + 3;

    // Text Value
    doc
      .fillColor(TEXT)
      .text(item.value, currentX, currentY, { lineBreak: false });
    currentX += doc.widthOfString(item.value);

    // Separator
    if (i < contactItems.length - 1) {
      doc.fillColor(ICON).text(SEP, currentX, currentY, { lineBreak: false });
      currentX += doc.widthOfString(SEP);
    }
  });

  doc.x = leftMargin;
  // 3. Manually push the cursor down past the row we just drew
  doc.moveDown(2.5);
}

export function renderDivider(doc: PDFKit.PDFDocument): void {
  doc.moveDown(0.8);
  doc
    .strokeColor("#E5E5E5")
    .lineWidth(2) // Thinner line looks much cleaner
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .stroke();
  doc.moveDown(0.8); // Normalized, predictable padding
}

export function renderSectionTitle(
  doc: PDFKit.PDFDocument,
  title: string
): void {
  // Ensure we are flushed to the left margin when generating a title
  doc.x = doc.page.margins.left || 50;
  doc.moveDown(1);
  doc
    .fillColor("#111111")
    .fontSize(12)
    .font("Helvetica-Bold")
    .text(title, { characterSpacing: 1.2, align: "left" });
  doc.moveDown(0.6);
}

export function renderSummary(
  doc: PDFKit.PDFDocument,
  description: string
): boolean {
  if (!description) return false;

  renderSectionTitle(doc, "PROFESSIONAL SUMMARY");

  doc.x = doc.page.margins.left || 50; // Extra protection for layout tracking
  doc
    .fillColor("#333333")
    .fontSize(9.5)
    .font("Helvetica")
    .text(description, { align: "left", lineGap: 3 });
  doc.moveDown(0.3);
  return true;
}

export function renderExperience(
  doc: PDFKit.PDFDocument,
  experience: Experience[] | undefined
): boolean {
  if (!experience || experience.length === 0) return false;

  renderSectionTitle(doc, "PROFESSIONAL EXPERIENCE");

  const leftMargin = doc.page.margins.left || 50;
  const rightBoundary = doc.page.width - (doc.page.margins.right || 50);

  experience.forEach((exp, index) => {
    // Capture the exact vertical baseline where this entry starts
    const startY = doc.y;

    // 1. Role and Company (Rendered smoothly on ONE line)
    // doc
    //   .fillColor("#111111")
    //   .fontSize(11)
    //   .font("Helvetica-Bold")
    //   .text(exp.role, { continued: true });

    // doc.font("Helvetica").fillColor("#555555").text(` at ${exp.company}`); // Line ends here, cursor drops automatically

    // // 2. Render Duration Badge (Aligned to the startY we captured)
    // renderDurationBadge(doc, exp.duration, startY);

    // 1. Render Role
    doc
      .fillColor("#111111")
      .fontSize(11)
      .font("Helvetica-Bold")
      .text(exp.role, { lineBreak: false });

    // 2. Calculate where the company tag should start
    const roleWidth = doc.widthOfString(exp.role);
    const tagX = leftMargin + roleWidth + 12; // Gap after the role
    const tagY = startY - 2; // Slight optical adjustment upward
    const textPaddingX = 6;
    const textPaddingY = 3;

    doc.font("Helvetica-Bold").fontSize(9.5); // Slightly smaller font for the badge look
    const companyWidth = doc.widthOfString(exp.company);

    const badgeWidth = companyWidth + textPaddingX * 2;
    const badgeHeight = 15;

    // 3. Draw Tag Background
    doc
      .roundedRect(tagX, tagY, badgeWidth, badgeHeight, 3)
      .fillColor("#F0F4F8") // Soft blue-gray background tint
      .fill();

    // 4. Draw Tag Text
    doc
      .fillColor("#2B6CB0") // Darker blue text for contrast/readability
      .text(exp.company, tagX + textPaddingX, tagY + textPaddingY, {
        lineBreak: false,
      });

    renderDurationBadge(doc, exp.duration, startY);
    // 5. Safely reset cursor down past the header row
    doc.y = startY + badgeHeight;

    // Reset X positioning back to layout margins safely
    doc.x = leftMargin;
    doc.moveDown(1.5);

    // 3. Description Layout
    if (exp.description) {
      doc.moveDown(0.3);
      doc.x += 10;
      doc
        .fillColor("#333333")
        .fontSize(9.5)
        .font("Helvetica")
        .text(exp.description, { align: "justify", lineGap: 3 });

      // 4. Horizontal Divider (Safe vector drawing)
      doc.moveDown(0.4); // Advance layout cursor first to claim space for the line
    }
    doc.x = leftMargin; // Ensure we are back at the left margin before drawing the line

    // Space between jobs (skipping the absolute last entry)
    if (index < experience.length - 1) {
      doc.moveDown(0.8);
    }
  });

  return true;
}

export function renderSkillsMatrix(
  doc: PDFKit.PDFDocument,
  skills: SkillItem[] | undefined
): boolean {
  if (!skills || skills.length === 0) return false;

  renderSectionTitle(doc, "CORE SKILLS & EXPERTISE");

  const COLUMN_WIDTH = 180; // Width of each column
  const ICON_COLOR = "#C4F029"; // Accent color for skill icons
  const TEXT_COLOR = "#333333"; // Text color
  const FONT_SIZE = 9.5; // Font size for skills
  const LINE_GAP = 6; // Gap between rows

  let x = 50; // Starting X position
  let y = doc.y; // Starting Y position

  skills.forEach((skill, index) => {
    // Draw skill icon (circle)
    doc
      .circle(x + 5, y + 5, 3) // Small circle as an icon
      .fillColor(ICON_COLOR)
      .fill();

    // Draw skill name and expertise
    doc
      .fillColor(TEXT_COLOR)
      .fontSize(FONT_SIZE)
      .font("Helvetica")
      .text(`${skill.name} (${skill.expertise}/5)`, x + 15, y, {
        lineBreak: false,
      });

    // Move to the next column or row
    if ((index + 1) % 3 === 0) {
      // Move to the next row after 3 columns
      x = 50;
      y += LINE_GAP + FONT_SIZE;
    } else {
      // Move to the next column
      x += COLUMN_WIDTH;
    }
  });

  // Add some spacing after the skills matrix
  doc.moveDown(1);

  return true;
}

export function renderEducation(
  doc: PDFKit.PDFDocument,
  education: Education[] | undefined
): boolean {
  if (!education || education.length === 0) return false;

  renderSectionTitle(doc, "EDUCATION");

  const leftMargin = doc.page.margins.left || 50;
  //const rightBoundary = doc.page.width - (doc.page.margins.right || 50);

  education.forEach((edu, index) => {
    // 1. Capture vertical baseline for the badge alignment
    const startY = doc.y;

    // 2. Render Institution Name (Clean, Bold, Left-aligned)
    doc
      .fillColor("#111111")
      .fontSize(11)
      .font("Helvetica-Bold")
      .text(edu.institution, leftMargin, startY);

    // 3. Render your signature Duration Badge on the right
    // Reuses the exact same logic and calculations from your experience section!
    if (edu.duration) {
      renderDurationBadge(doc, edu.duration, startY);
    }

    // 4. Drop down and render Degree + Grade Metadata on the next line
    doc.x = leftMargin + 10; // Ensure we are flush left
    doc.moveDown(1.5); // Minor structural gap

    // Indent the degree slightly for an elegant visual hierarchy
    const detailX = leftMargin + 10;

    doc
      .fillColor("#555555")
      .fontSize(9.5)
      .font("Helvetica")
      .text(edu.degree, detailX, doc.y, {
        continued: edu.grade ? true : false,
      });

    // Append Grade Pill/Text right next to the degree if it exists
    if (edu.grade) {
      doc
        .fillColor("#888888")
        .font("Helvetica")
        .text("   |   ", { continued: true });

      doc
        .fillColor("#4A90D9") // Using your accent color to make the grade pop cleanly
        .font("Helvetica-Bold")
        .text(`Grade: ${edu.grade}/100`);
    }

    // Reset X positioning back to standard margins safely
    doc.x = leftMargin;

    // 5. Spacing between different academic credentials
    if (index < education.length - 1) {
      doc.moveDown(1);
    }
  });

  return true;
}

export function renderInlineTagsSection(
  doc: PDFKit.PDFDocument,
  title: string,
  tags: string[] | undefined
): boolean {
  if (!tags || tags.length === 0) return false;

  // 1. Render the structured section header
  renderSectionTitle(doc, title);

  const leftMargin = doc.page.margins.left || 50;
  const rightBoundary = doc.page.width - (doc.page.margins.right || 50);
  const maxWidth = rightBoundary - leftMargin;

  // Layout Configuration Constants
  const TAG_BG = "#F3F4F6"; // Clean, modern soft-gray capsule background
  const TAG_TEXT = "#4B5563"; // Premium charcoal slate for text legibility
  const FONT_SIZE = 9;
  const PAD_X = 8; // Horizontal inner padding for the pill
  const PAD_Y = 3; // Vertical inner padding for the pill
  const GAP_X = 6; // Horizontal gap between adjacent pills
  const GAP_Y = 6; // Vertical gap between rows of pills
  const RADIUS = 4; // Rounded corner intensity

  doc.font("Helvetica").fontSize(FONT_SIZE);

  let currentX = leftMargin;
  let currentY = doc.y;
  let rowHeight = 0;

  tags.forEach((tag) => {
    // Calculate the raw string width and total pill size
    const textWidth = doc.widthOfString(tag);
    const pillWidth = textWidth + PAD_X * 2;
    const pillHeight = FONT_SIZE + PAD_Y * 2;

    rowHeight = Math.max(rowHeight, pillHeight);

    // 2. Wrap Layout Engine: If pill exceeds right boundary, break line
    if (currentX + pillWidth > rightBoundary) {
      currentX = leftMargin; // Reset to left wall
      currentY += rowHeight + GAP_Y; // Push down to next row
      rowHeight = pillHeight; // Reset row tracking height
    }

    // 3. Draw Pill Background Vector Capsule
    doc
      .roundedRect(currentX, currentY, pillWidth, pillHeight, RADIUS)
      .fillColor(TAG_BG)
      .fill();

    // 4. Draw Pill Text cleanly centered over the background
    doc
      .fillColor(TAG_TEXT)
      .text(tag, currentX + PAD_X, currentY + PAD_Y + 0.5, {
        lineBreak: false,
        width: textWidth,
        align: "center",
      });

    // Move layout cursor rightward for the next element sequence
    currentX += pillWidth + GAP_X;
  });

  // 5. Update global document cursor position past the final row painted
  doc.x = leftMargin;
  doc.y = currentY + rowHeight;
  doc.moveDown(0.5);

  return true;
}

export function renderDate(doc: PDFKit.PDFDocument): void {
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  doc.fillColor("#737373").fontSize(10).font("Helvetica").text(dateStr);
  doc.moveDown(1);
}

export function renderRecipientInfo(doc: PDFKit.PDFDocument, job: Job): void {
  doc
    .fillColor("#111111")
    .fontSize(10.5)
    .font("Helvetica-Bold")
    .text("Hiring Team");

  doc.font("Helvetica").text(job.company);

  if (job.location) {
    doc.text(job.location);
  }

  doc.moveDown(1.5);
}

export function renderSubjectAndSalutation(
  doc: PDFKit.PDFDocument,
  job: Job
): void {
  doc
    .fillColor("#111111")
    .fontSize(11)
    .font("Helvetica-Bold")
    .text(`Subject: Application for the ${job.title} position`);

  doc.moveDown(1.2);

  doc
    .fillColor("#262626")
    .fontSize(10.5)
    .font("Helvetica")
    .text(`Dear Hiring Team at ${job.company},`);

  doc.moveDown(1);
}

export function renderSignOff(
  doc: PDFKit.PDFDocument,
  candidateName: string
): void {
  doc.moveDown(2);
  doc.fillColor("#262626").fontSize(10.5).font("Helvetica").text("Sincerely,");

  doc.moveDown(1.5);
  doc.font("Helvetica-Bold").text(`${candidateName || "Candidate"}`);
}

function formatDuration(duration: Duration): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Ensure `start` and `end` are Date objects
  const startDate = new Date(duration.start);
  const endDate =
    duration.end === "Present" ? "Present" : new Date(duration.end);

  const start = `${months[startDate.getMonth()]} ${startDate.getFullYear()}`;
  const end =
    endDate === "Present"
      ? "Present"
      : `${months[endDate.getMonth()]} ${endDate.getFullYear()}`;

  return `${start} – ${end}`;
}

function getTenure(duration: Duration): string {
  const end = duration.end === "Present" ? new Date() : duration.end;
  const months =
    (end.getFullYear() - duration.start.getFullYear()) * 12 +
    (end.getMonth() - duration.start.getMonth());
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  const parts = [];
  if (yrs > 0) parts.push(`${yrs}y`);
  if (mos > 0) parts.push(`${mos}m`);
  return parts.join(" ");
}

function renderDurationBadge(
  doc: PDFKit.PDFDocument,
  duration: Duration,
  y: number
) {
  const label = formatDuration(duration);
  const tenure = getTenure(duration);
  const isPresent = duration.end === "Present";

  const RIGHT_EDGE = 545;
  const BADGE_H = 14;
  const BADGE_Y = y - 1;
  const DOT_R = 2.5;
  const PAD_X = 7;
  const GAP = 5;

  // Measure text widths
  doc.font("Helvetica").fontSize(8);
  const labelW = doc.widthOfString(label);
  const tenureW = doc.widthOfString(tenure);

  const totalW = PAD_X + DOT_R * 2 + GAP + labelW + 10 + tenureW + PAD_X;
  const BADGE_X = RIGHT_EDGE - totalW;

  // Badge background
  doc
    .roundedRect(BADGE_X, BADGE_Y, totalW, BADGE_H, 3)
    .fillColor(isPresent ? "#EEF9D0" : "#F3F3F3")
    .fill();

  // Dot — green if present, gray otherwise
  doc
    .circle(BADGE_X + PAD_X + DOT_R, BADGE_Y + BADGE_H / 2, DOT_R)
    .fillColor(isPresent ? "#7DB800" : "#AAAAAA")
    .fill();

  // Date range label
  doc
    .fillColor(isPresent ? "#3D6200" : "#555555")
    .font("Helvetica")
    .fontSize(8)
    .text(label, BADGE_X + PAD_X + DOT_R * 2 + GAP, BADGE_Y + 2.5, {
      lineBreak: false,
    });

  // Divider
  const dividerX = BADGE_X + PAD_X + DOT_R * 2 + GAP + labelW + 4;
  doc
    .moveTo(dividerX, BADGE_Y + 3)
    .lineTo(dividerX, BADGE_Y + BADGE_H - 3)
    .strokeColor(isPresent ? "#AEDD6A" : "#CCCCCC")
    .lineWidth(0.5)
    .stroke();

  // Tenure
  doc
    .fillColor(isPresent ? "#5A8F00" : "#888888")
    .font("Helvetica-Bold")
    .fontSize(8)
    .text(tenure, dividerX + 5, BADGE_Y + 2.5, { lineBreak: false });
}
