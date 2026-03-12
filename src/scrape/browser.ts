/**
 * Playwright 기반 브라우저 유틸리티.
 */

import path from "node:path";
import { URL } from "node:url";
import { htmlToMarkdown, slugify } from "../core/markdown.js";
import { decodeUrlPathSegment, normalizeScrapedMarkdown } from "../core/scraped.js";

export const BASE_URL = "https://apicenter.commerce.naver.com";

const CONTENT_SELECTORS = [
  "main article",
  "main .content",
  "main [class*='content']",
  "[class*='docs-content']",
  "[class*='doc-content']",
  "[class*='article']",
  "article",
  "main",
  "[role='main']",
];

const REMOVE_SELECTORS = [
  "nav", "aside", "header", "footer",
  ".sidebar", "[class*='sidebar']",
  "[class*='toc']", "[class*='breadcrumb']",
  "[class*='pagination']", "[class*='feedback']",
  "[class*='edit-link']", "script", "style",
];

// ── 네비게이션 ────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function expandAllNav(page: any): Promise<void> {
  for (let i = 0; i < 10; i++) {
    const collapsed = await page.$$(
      "[aria-expanded='false'], " +
      "[class*='arrow']:not([class*='open']):not([class*='active']), " +
      "[class*='toggle']:not([class*='open']):not([class*='active'])",
    );
    if (!collapsed.length) break;
    for (const el of collapsed) {
      try { await el.click({ timeout: 500 }); } catch { /* ignore */ }
    }
    await page.waitForTimeout(400);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function collectNavLinks(page: any): Promise<Array<{ url: string; title: string }>> {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
  await expandAllNav(page);
  await page.waitForTimeout(800);

  const links: Array<{ href: string; text: string }> = await page.evaluate(`(() => {
    const result = [];
    const seen = new Set();
    const primarySelectors = [
      'nav a[href*="/docs"]',
      '.sidebar a[href*="/docs"]',
      '[class*="sidebar"] a[href*="/docs"]',
      '[class*="nav"] a[href*="/docs"]',
      '[class*="menu"] a[href*="/docs"]',
      '[class*="tree"] a[href*="/docs"]',
      '[class*="toc"] a[href*="/docs"]',
    ];
    for (const sel of primarySelectors) {
      document.querySelectorAll(sel).forEach(el => {
        const href = el.getAttribute('href') || '';
        const text = el.textContent.trim();
        if (href && text && !seen.has(href)) { seen.add(href); result.push({ href, text }); }
      });
    }
    if (result.length === 0) {
      document.querySelectorAll('a[href*="/docs"]').forEach(el => {
        const href = el.getAttribute('href') || '';
        const text = el.textContent.trim();
        if (href && text && !seen.has(href)) { seen.add(href); result.push({ href, text }); }
      });
    }
    return result;
  })()`);

  const seenUrls = new Set<string>();
  const result: Array<{ url: string; title: string }> = [];
  for (const item of links) {
    const { href, text } = item;
    if (href.startsWith("#")) continue;
    const absUrl = href.startsWith("http") ? href : new URL(href, BASE_URL).toString();
    const cleanUrl = absUrl.split("?")[0].split("#")[0];
    if (!seenUrls.has(cleanUrl) && cleanUrl.includes("/docs")) {
      seenUrls.add(cleanUrl);
      result.push({ url: cleanUrl, title: text });
    }
  }
  return result;
}

// ── 콘텐츠 추출 ───────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function extractContentHtml(page: any): Promise<string> {
  const html: string = await page.evaluate(`(() => {
    const contentSelectors = ${JSON.stringify(CONTENT_SELECTORS)};
    const removeSelectors = ${JSON.stringify(REMOVE_SELECTORS)};
    function cleanAndReturn(el) {
      const clone = el.cloneNode(true);
      for (const sel of removeSelectors) clone.querySelectorAll(sel).forEach(n => n.remove());
      const text = clone.textContent.trim();
      if (text.length > 100) return clone.innerHTML;
      return null;
    }
    for (const sel of contentSelectors) {
      const el = document.querySelector(sel);
      if (el) { const r = cleanAndReturn(el); if (r) return r; }
    }
    const body = document.body.cloneNode(true);
    for (const sel of removeSelectors) body.querySelectorAll(sel).forEach(n => n.remove());
    return body.innerHTML;
  })()`);
  return html;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function pageToMarkdown(page: any, url: string, title: string): Promise<string> {
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1500);
  const html = await extractContentHtml(page);
  const body = normalizeScrapedMarkdown(htmlToMarkdown(html));
  return `# ${title}\n\n> 원문: ${url}\n\n${body}\n`;
}

// ── URL → 파일 경로 ───────────────────────────────────────────────────────────

export function urlToFilepath(url: string, outputDir: string): string {
  const parsed = new URL(url);
  let urlPath = parsed.pathname.replace(/^\//, "");
  if (urlPath.startsWith("docs/")) urlPath = urlPath.slice(5);
  const parts = urlPath
    .split("/")
    .filter(Boolean)
    .map(decodeUrlPathSegment)
    .map(slugify);
  if (!parts.length) parts.push("introduction");
  return path.join(outputDir, ...parts.slice(0, -1), `${parts[parts.length - 1]}.md`);
}
