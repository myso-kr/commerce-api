import { info, setCmd, verbose } from "../core/emit.js";
import { emitGuide } from "../core/guide.js";
import { resolveManagedDocsRoot, resolveManagedRawsRoot } from "../core/paths.js";
import { run as runCheck } from "../check/index.js";
import { run as runScrapeApi } from "../scrape-api/index.js";

export interface SyncOpts {
  out?: string;
  dst?: string;
  summary?: boolean;
}

export async function run(opts: SyncOpts): Promise<number> {
  setCmd("sync");
  const summary = opts.summary ?? true;
  const out = opts.out ?? resolveManagedRawsRoot();
  const dst = opts.dst ?? resolveManagedDocsRoot();

  verbose("start", {
    out,
    dst,
    summary,
  });

  const scrapeCode = await runScrapeApi({
    out,
    dst,
    normalize: true,
    guide: false,
  });

  let validateCode = 1;
  if (scrapeCode === 0) {
    validateCode = runCheck({
      dst,
      summary,
      guide: false,
    });
  }

  const ok = scrapeCode === 0 && validateCode === 0;
  setCmd("sync");
  info("done", {
    out,
    dst,
    scraped: scrapeCode === 0,
    validated: scrapeCode === 0 ? validateCode === 0 : null,
    ok,
  });
  emitGuide({
    use_for: "Use sync only when the upstream developer docs changed and you need to refresh the local corpus beyond the bundled package docs.",
    next_steps: ok
      ? [
          `Use \`ask --dst ${dst} "<question>"\` if you want to target the refreshed cache explicitly.`,
          `Use \`api --dst ${dst} --path <path> --method <METHOD> --body\` for exact endpoint grounding after sync.`,
          "Read commands without `--dst` will also pick the synced cache automatically when no project-local docs/ exist.",
          "No further crawl is needed until the upstream docs change again.",
        ]
      : [
          "Inspect the failing scrape or validation events before trusting the refreshed corpus.",
          "Retry `sync` after resolving crawler or environment issues such as Playwright/browser setup.",
        ],
    caution: ok
      ? undefined
      : "Sync failed. The local docs may be partially refreshed and should not replace the bundled corpus yet.",
  });
  return ok ? 0 : 1;
}
