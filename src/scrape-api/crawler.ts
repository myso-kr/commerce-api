/**
 * Commerce API BFS 크롤러.
 */

import fs from "node:fs";
import path from "node:path";
import { URL } from "node:url";
import { debug, error, verbose, warn } from "../core/emit.js";
import { htmlToMarkdown, slugify } from "../core/markdown.js";
import { decodeUrlPathSegment, normalizeScrapedMarkdown } from "../core/scraped.js";

const BASE_URL = "https://apicenter.commerce.naver.com";
const CRAWL_ROOT = `${BASE_URL}/docs/commerce-api/current`;
const ALLOW_PREFIX = "/docs/commerce-api/current";
const DENY_PATTERN = /\/(2\.\d+\.\d+)\//;

const REMOVE_SELECTORS = [
  "nav", "aside", "header", "footer",
  ".sidebar", "[class*='sidebar']",
  "[class*='toc']", "[class*='breadcrumb']",
  "[class*='pagination']", "[class*='feedback']",
  "[class*='edit-link']", "script", "style",
];

const CONTENT_SELECTORS = [
  "main article",
  "main .content",
  "main [class*='content']",
  "[class*='docs-content']",
  "[class*='doc-content']",
  "article",
  "main",
  "[role='main']",
];

// ── URL 유틸 ─────────────────────────────────────────────────────────────────

export function urlToFilepath(url: string, outputDir: string): string {
  const parsed = new URL(url);
  let urlPath = parsed.pathname;
  const prefix = "/docs/commerce-api/current";
  if (urlPath.startsWith(prefix)) urlPath = urlPath.slice(prefix.length);
  urlPath = urlPath.replace(/^\//, "").replace(/\/$/, "");
  const parts = urlPath
    .split("/")
    .filter(Boolean)
    .map(decodeUrlPathSegment)
    .map(slugify);
  if (!parts.length) return path.join(outputDir, "_index.md");
  return path.join(outputDir, ...parts.slice(0, -1), `${parts[parts.length - 1]}.md`);
}

export function normalizeUrl(href: string): string | null {
  if (!href || href.startsWith("#")) return null;
  const absUrl = href.startsWith("http") ? href : new URL(href, BASE_URL).toString();
  const clean = absUrl.split("?")[0].split("#")[0].replace(/\/$/, "");
  const parsed = new URL(clean);
  if (parsed.hostname !== new URL(BASE_URL).hostname) return null;
  if (!parsed.pathname.startsWith(ALLOW_PREFIX)) return null;
  if (DENY_PATTERN.test(parsed.pathname)) return null;
  return clean;
}

// ── 페이지 조작 ───────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function expandSidebar(page: any): Promise<void> {
  for (let i = 0; i < 15; i++) {
    const collapsed = await page.$$("[aria-expanded='false']");
    if (!collapsed.length) break;
    let clicked = 0;
    for (const el of collapsed) {
      try { await el.click({ timeout: 300 }); clicked++; } catch { /* ignore */ }
    }
    if (!clicked) break;
    await page.waitForTimeout(300);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function extractContentHtml(page: any): Promise<string> {
  return page.evaluate(`(() => {
    const removeSelectors = ${JSON.stringify(REMOVE_SELECTORS)};
    const contentSelectors = ${JSON.stringify(CONTENT_SELECTORS)};
    function cleanEl(el) {
      const clone = el.cloneNode(true);
      for (const s of removeSelectors) clone.querySelectorAll(s).forEach(n => n.remove());
      return clone.innerHTML;
    }
    for (const sel of contentSelectors) {
      const el = document.querySelector(sel);
      if (el) { const html = cleanEl(el); if (el.textContent.trim().length > 50) return html; }
    }
    const body = document.body.cloneNode(true);
    for (const s of removeSelectors) body.querySelectorAll(s).forEach(n => n.remove());
    return body.innerHTML;
  })()`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function collectLinksFromPage(page: any): Promise<string[]> {
  const hrefs: string[] = await page.evaluate(`
    Array.from(document.querySelectorAll('a[href]'))
      .map(a => a.getAttribute('href'))
      .filter(h => h && !h.startsWith('#'))
  `);
  return hrefs.flatMap((href) => {
    const norm = normalizeUrl(href);
    return norm ? [norm] : [];
  });
}

// ── BFS 크롤 ─────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function crawl(context: any, outputDir: string): Promise<[number, number]> {
  fs.mkdirSync(outputDir, { recursive: true });

  const visited = new Set<string>();
  const queue: string[] = [CRAWL_ROOT];
  const errorsList: Array<{ url: string; error: string }> = [];
  let saved = 0;

  const page = await context.newPage();

  verbose("crawl_start", { url: CRAWL_ROOT, out: outputDir });
  await page.goto(CRAWL_ROOT, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(2500);
  await expandSidebar(page);
  await page.waitForTimeout(600);

  const seedLinks = await collectLinksFromPage(page);
  for (const link of seedLinks) {
    if (!visited.has(link) && !queue.includes(link)) queue.push(link);
  }
  verbose("seed_links", { count: seedLinks.length });

  while (queue.length > 0) {
    const url = queue.shift()!;
    if (visited.has(url)) continue;
    visited.add(url);

    const idx = saved + errorsList.length + 1;
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(1000);

      const title: string = await page.evaluate(
        "document.querySelector('h1')?.textContent?.trim() || document.title",
      );

      const html = await extractContentHtml(page);
      const body = normalizeScrapedMarkdown(htmlToMarkdown(html));

      if (!body || body.length < 30) {
        warn("skip", { idx, url, msg: "내용 없음" });
        continue;
      }

      const markdown = `# ${title}\n\n> 원문: ${url}\n\n${body}\n`;
      const filePath = urlToFilepath(url, outputDir);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, markdown, "utf-8");

      let rel: string;
      try {
        rel = path.relative(path.dirname(path.dirname(outputDir)), filePath).replace(/\\/g, "/");
      } catch {
        rel = filePath;
      }

      debug("page", { idx, url, file: rel, chars: body.length, ok: true });
      saved++;

      const newLinks = await collectLinksFromPage(page);
      let added = 0;
      for (const link of newLinks) {
        if (!visited.has(link) && !queue.includes(link)) {
          queue.push(link);
          added++;
        }
      }
      if (added) debug("new_links", { idx, added, queue: queue.length });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      error("page", { idx, url, msg, ok: false });
      errorsList.push({ url, error: msg });
    }

    await page.waitForTimeout(600);
  }

  // 인덱스 저장
  const allMdFiles: string[] = [];
  function walkDir(d: string): void {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walkDir(full);
      else if (e.isFile() && e.name.endsWith(".md")) allMdFiles.push(full);
    }
  }
  walkDir(outputDir);
  allMdFiles.sort();

  const indexLines = [
    "# Commerce API - 전체 페이지 목록",
    "",
    `수집일: ${new Date().toISOString()}`,
    `총 ${saved}개 페이지`,
    "",
    ...allMdFiles.map((f) => {
      const rel = path.relative(outputDir, f).replace(/\\/g, "/");
      return `- [${rel}](./${rel})`;
    }),
  ];
  fs.writeFileSync(path.join(outputDir, "_index.md"), indexLines.join("\n"), "utf-8");

  if (errorsList.length) {
    const errLines = [
      "# 오류 목록",
      "",
      ...errorsList.map((e) => `- ${e.url}: ${e.error}`),
    ];
    fs.writeFileSync(path.join(outputDir, "_errors.md"), errLines.join("\n"), "utf-8");
  }

  return [saved, errorsList.length];
}
