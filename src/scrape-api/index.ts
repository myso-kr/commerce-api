/**
 * scrape-api 커맨드 — Commerce API BFS 크롤러.
 */

import path from "node:path";
import { setCmd, info, error } from "../core/emit.js";
import { emitGuide } from "../core/guide.js";
import { resolveWritableDocsRoot, resolveWritableRawsRoot } from "../core/paths.js";
import { normalizeScrapedDocs } from "../pipeline/normalize.js";

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

export interface ScrapeApiOpts {
  out?: string;
  dst?: string;
  normalize?: boolean;
  guide?: boolean;
  maintainer?: boolean;
}

function rejectWithoutMaintainerFlag(): number {
  error("maintainer_only", {
    ok: false,
    msg: "scrape-api는 maintainer 전용 raw 수집 명령입니다. 일반적인 질의/구현 workflow에서는 사용할 수 없습니다.",
    required_flag: "--maintainer",
  });
  emitGuide({
    use_for: "Do not start with scrape-api for ordinary npx retrieval. Use the normalized docs that are already bundled or cached.",
    next_steps: [
      'Run `ask "<question>"` first to retrieve likely guide/api documents.',
      "Run `api --path <path> --method <METHOD> --body` or `api --doc-id <id>` for exact grounding.",
      "Run `sync` only when you explicitly need the latest upstream docs in managed cache.",
      "Use `scrape-api --maintainer ...` only for maintainer raw crawl refreshes and crawler debugging.",
    ],
    caution: "scrape-api performs a deep raw crawl and requires Playwright/browser setup. It should not be the first choice for LLM agents.",
  });
  return 1;
}

async function main(
  outputDir: string,
  docsDir: string,
  normalize: boolean,
  shouldEmitGuide: boolean,
): Promise<number> {
  // Dynamic import — playwright is optional
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { chromium } = await import("playwright");
  const { crawl } = await import("./crawler.js");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ userAgent: USER_AGENT });

  try {
    const [saved, errors] = await crawl(context, outputDir);
    let normalizeCode = 0;
    if (normalize && saved > 0) {
      normalizeCode = normalizeScrapedDocs({
        cmd: "scrape-api",
        src: outputDir,
        dst: docsDir,
      });
    }

    info("done", {
      saved,
      errors,
      out: outputDir,
      normalized: normalize,
      normalized_dst: normalize ? docsDir : null,
      normalize_ok: normalize ? normalizeCode === 0 : null,
      ok: errors === 0 && normalizeCode === 0,
    });
    if (shouldEmitGuide) {
      emitGuide({
        use_for: "Use scrape-api output to refresh the raw Commerce API source and optionally rebuild the normalized corpus for downstream agents.",
        next_steps: normalize
          ? [
              `Run \`review --dst ${docsDir}\` to validate the rebuilt docs.`,
              `Run \`noise --dst ${docsDir}\` to check cleanup quality.`,
              `Run \`ask --dst ${docsDir} --format compact "<question>"\` or \`api --dst ${docsDir} --path <path> --method <METHOD>\` to verify retrieval.`,
            ]
          : [
              `Run \`lint --fix --src ${outputDir} --dst ${docsDir}\` to turn the raw crawl into normalized docs.`,
              `Run \`review --dst ${docsDir}\` after normalization completes.`,
              `Run \`llms --dst ${docsDir}\` when you need fresh LLM ingestion artifacts.`,
            ],
        caution:
          errors !== 0 || normalizeCode !== 0
            ? "Crawler or normalization failures can leave the refreshed corpus incomplete."
            : undefined,
        artifacts: normalize ? [outputDir, docsDir] : [outputDir],
      });
    }
    return errors !== 0 || normalizeCode !== 0 ? 1 : 0;
  } finally {
    await browser.close();
  }
}

export async function run(opts: ScrapeApiOpts): Promise<number> {
  setCmd("scrape-api");
  if (!opts.maintainer) return rejectWithoutMaintainerFlag();
  const out = resolveWritableRawsRoot(opts.out);
  const dst = resolveWritableDocsRoot(opts.dst);
  const normalize = opts.normalize ?? true;
  const shouldEmitGuide = opts.guide ?? true;
  info("start", { out, dst, normalize });
  try {
    return await main(out, dst, normalize, shouldEmitGuide);
  } catch (e: unknown) {
    error("fatal", { msg: String(e), ok: false });
    return 1;
  }
}
