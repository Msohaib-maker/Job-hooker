import { Page } from "puppeteer";

export async function scrapeZipRecruiter(page: Page) {
  const data = await page.evaluate(() => {
    const main = document.querySelector("main");
    if (!main) return null;

    function buildPath(node: HTMLElement): string {
      if (!node.parentElement) return node.tagName.toLowerCase();

      const index = [...node.parentElement.children].indexOf(node);
      return `${buildPath(node.parentElement)} > ${node.tagName.toLowerCase()}:nth-child(${index + 1})`;
    }

    function walk(node: HTMLElement) {
      return {
        tag: node.tagName?.toLowerCase() || null,
        classes: node.classList ? [...node.classList] : [],
        id: node.id || null,

        text:
          node.childNodes.length === 1 &&
          node.childNodes[0].nodeType === Node.TEXT_NODE
            ? node.textContent.trim()
            : null,

        // NEW: extract all text like innerText
        fullText: node.innerText?.trim() || null,

        // NEW: extract attributes
        attributes: node.getAttributeNames().reduce(
          (acc, name) => {
            acc[name] = node.getAttribute(name);
            return acc;
          },
          {} as Record<string, string | null>
        ),

        // NEW: absolute path
        path: buildPath(node),

        // NEW: sibling index
        index: [...(node.parentElement?.children || [])].indexOf(node),

        // NEW: number detection
        hasNumber: /\d+/.test(node.innerText || ""),
        numbers: (node.innerText?.match(/\d+/g) || []).map(Number),

        // children
        children: [...node.children].map(walk),
      };
    }

    return walk(main);
  });

  return data;
}

export function findSubtree(root, { tag, className }) {
  function matches(node) {
    if (tag && node.tag !== tag) return false;

    if (className && !(node.classes || []).includes(className)) return false;

    return true;
  }

  function dfs(node) {
    if (matches(node)) return node;

    for (const child of node.children || []) {
      const found = dfs(child);
      if (found) return found;
    }
    return null;
  }

  return dfs(root);
}

export function findAllByFilter(
  root,
  filters: {
    tag?: string;
    className?: string;
    id?: string;
    attribute?: [string, string?];
    textIncludes?: string;
  } = {}
) {
  const results = [];

  function matches(node) {
    if (filters.tag && node.tag !== filters.tag) return false;
    if (filters.id && node.id !== filters.id) return false;
    if (filters.className && !(node.classes || []).includes(filters.className))
      return false;
    if (
      filters.textIncludes &&
      !(node.fullText || "").includes(filters.textIncludes)
    )
      return false;

    if (filters.attribute) {
      const [attrName, attrValue] = filters.attribute;

      if (!node.attributes || !node.attributes[attrName]) return false;

      if (attrValue && node.attributes[attrName] !== attrValue) return false;
    }

    return true;
  }

  function dfs(node) {
    if (matches(node)) results.push(node);

    for (const child of node.children || []) {
      dfs(child);
    }
  }

  dfs(root);
  return results;
}

export function extractAllPText(node, collected = []) {
  if (!node) return collected;

  // If this node is a <p>, collect its text/fullText
  if (node.tag === "p") {
    if (node.text) collected.push(node.text);
    else if (node.fullText) collected.push(node.fullText);
  }

  // Recursively check children
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      extractAllPText(child, collected);
    }
  }

  return collected;
}
