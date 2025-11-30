import { Page } from "puppeteer";

export async function scrapeIndeedJobs(page: Page) {
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

export type DomNode = {
  tag: string | null;
  classes: string[];
  id: string | null;

  text: string | null;
  fullText: string | null;

  attributes: Record<string, string | null>;
  index: number;
  path: string;

  hasNumber: boolean;
  numbers: number[];

  children: DomNode[];
};

/**
 * Find nodes by tag (e.g., "ul")
 */
export function findElementsByTag(tree: DomNode, tag: string): DomNode[] {
  const results: DomNode[] = [];

  function search(node: DomNode) {
    if (node.tag === tag.toLowerCase()) {
      results.push(node);
    }
    node.children.forEach(search);
  }

  search(tree);
  return results;
}

/**
 * Find nodes containing a certain text anywhere inside the node.
 */
export function findNodesByText(root: DomNode, text: string): DomNode[] {
  const results: DomNode[] = [];
  const term = text.toLowerCase();

  function walk(node: DomNode) {
    const hits =
      (node.text && node.text.toLowerCase().includes(term)) ||
      (node.fullText && node.fullText.toLowerCase().includes(term));

    if (hits) results.push(node);

    node.children.forEach(walk);
  }

  walk(root);
  return results;
}

/**
 * Find nodes that contain ONLY numbers (pure numeric nodes)
 */
export function findNodesWithPureNumbers(root: DomNode): DomNode[] {
  const results: DomNode[] = [];

  function walk(node: DomNode) {
    if (node.text && /^\d+$/.test(node.text.trim())) {
      results.push(node);
    }
    node.children.forEach(walk);
  }

  walk(root);
  return results;
}

/**
 * Find any nodes that contain numbers anywhere inside them.
 */
export function findNodesWithNumbers(root: DomNode): DomNode[] {
  const results: DomNode[] = [];

  function walk(node: DomNode) {
    if (node.hasNumber) results.push(node);
    node.children.forEach(walk);
  }

  walk(root);
  return results;
}

// parentSelector: { tag?: string, classContains?: string }
// childSelector:  { tag?: string, classContains?: string }

export function findNodesWithChild(tree, parentSel, childSel) {
  const results = [];

  function walk(node) {
    if (!node) return;

    const isParentMatch =
      node.tag === parentSel.tag &&
      (!parentSel.classContains ||
        node.classes?.some((c) => c.includes(parentSel.classContains)));

    if (isParentMatch) {
      const child = node.children?.find(
        (ch) =>
          ch.tag === childSel.tag &&
          (!childSel.classContains ||
            ch.classes?.some((c) => c.includes(childSel.classContains)))
      );

      if (child) {
        // OPTIONAL: find span inside <a>
        const span = child.children?.find((ch) => ch.tag === "span");

        results.push({
          parent: node,
          child,
          span,
          text: span?.fullText || child.fullText || child.text || null,
          href: child.attributes?.href || null,
          jobkey: child.attributes?.["data-jk"] || null,
          path: child.path,
        });
      }
    }

    for (const ch of node.children || []) walk(ch);
  }

  walk(tree);
  return results;
}
