/**
 * scrape 커맨드 — 최상위 docs/ 페이지 스크래퍼.
 */

import fs from "node:fs";
import path from "node:path";
import { debug, error, info, setCmd, verbose } from "../core/emit.js";
import { emitGuide } from "../core/guide.js";
import { resolveWritableDocsRoot, resolveWritableRawsBaseDir } from "../core/paths.js";
import { normalizeScrapedDocs } from "../pipeline/normalize.js";

const BASE_URL = "https://apicenter.commerce.naver.com";
const START_URL = `${BASE_URL}/docs/introduction`;

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

export interface ScrapeOpts {
  out?: string;
  dst?: string;
  normalize?: boolean;
}

async function main(outputDir: string, docsDir: string, normalize: boolean): Promise<number> {
  // Dynamic import — playwright is optional
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { chromium } = await import("playwright");
  const { collectNavLinks, pageToMarkdown, urlToFilepath } = await import("./browser.js");

  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ userAgent: USER_AGENT });
  const page = await context.newPage();

  try {
    info("start", { url: START_URL, out: outputDir });
    await page.goto(START_URL, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(3000);

    const links = await collectNavLinks(page);

    if (!links.length) {
      const debugPath = path.join(outputDir, "__debug_page.html");
      fs.writeFileSync(debugPath, await page.content(), "utf-8");
      error("no_links", { debug: debugPath, ok: false });
      return 1;
    }

    verbose("links_found", { count: links.length });

    // 인덱스 저장
    const indexLines = [
      "# Naver Commerce API Center - 문서 목록",
      "",
      `수집일: ${new Date().toISOString()}`,
      "",
      ...links.map((item) => `- [${item.title}](${item.url})`),
    ];
    fs.writeFileSync(path.join(outputDir, "_index.md"), indexLines.join("\n"), "utf-8");

    const total = links.length;
    const errorsList: Array<{ url: string; title: string; error: string }> = [];

    for (let i = 0; i < links.length; i++) {
      const { url, title } = links[i];
      try {
        const content = await pageToMarkdown(page, url, title);
        const filePath = urlToFilepath(url, outputDir);
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, content, "utf-8");
        debug("page", {
          idx: i + 1,
          total,
          url,
          file: path.relative(outputDir, filePath).replace(/\\/g, "/"),
          ok: true,
        });
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        error("page", { idx: i + 1, total, url, msg, ok: false });
        errorsList.push({ url, title, error: msg });
      }
      await page.waitForTimeout(700);
    }

    if (errorsList.length) {
      const errLines = [
        "# 오류 목록",
        "",
        ...errorsList.map((e) => `- [${e.title}](${e.url}): ${e.error}`),
      ];
      fs.writeFileSync(path.join(outputDir, "_errors.md"), errLines.join("\n"), "utf-8");
    }

    const saved = total - errorsList.length;
    let normalizeCode = 0;
    if (normalize && saved > 0) {
      normalizeCode = normalizeScrapedDocs({
        cmd: "scrape",
        src: outputDir,
        dst: docsDir,
      });
    }

    info("done", {
      ok: saved,
      errors: errorsList.length,
      total,
      out: outputDir,
      normalized: normalize,
      normalized_dst: normalize ? docsDir : null,
      normalize_ok: normalize ? normalizeCode === 0 : null,
    });
    emitGuide({
      use_for: "Use the raw scrape output for provenance and the normalized docs for downstream agent retrieval.",
      next_steps: normalize
        ? [
            `Run \`review --dst ${docsDir}\` to validate the normalized corpus.`,
            `Run \`noise --dst ${docsDir}\` to detect leftover UI artifacts.`,
            `Run \`ask --dst ${docsDir} --format compact "<question>"\` to verify retrieval against the new scrape.`,
          ]
        : [
            `Run \`lint --fix --src ${outputDir} --dst ${docsDir}\` to normalize the raw scrape into docs/.`,
            `Run \`review --dst ${docsDir}\` after normalization completes.`,
            `Run \`llms --dst ${docsDir}\` when you need fresh LLM ingestion artifacts.`,
          ],
      caution:
        errorsList.length > 0 || normalizeCode !== 0
          ? "Scrape failures or normalization failures can leave the corpus partially updated."
          : undefined,
      artifacts: normalize ? [outputDir, docsDir] : [outputDir],
    });
    return errorsList.length || normalizeCode !== 0 ? 1 : 0;
  } finally {
    await browser.close();
  }
}

export async function run(opts: ScrapeOpts): Promise<number> {
  setCmd("scrape");
  const out = resolveWritableRawsBaseDir(opts.out);
  const dst = resolveWritableDocsRoot(opts.dst);
  const normalize = opts.normalize ?? true;

  try {
    return await main(out, dst, normalize);
  } catch (e: unknown) {
    error("fatal", { msg: String(e), ok: false });
    return 1;
  }
}
