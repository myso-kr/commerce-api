import { info, setCmd, verbose } from "../core/emit.js";
import { emitGuide } from "../core/guide.js";
import { resolveManagedDocsRoot, resolveManagedRawsRoot } from "../core/paths.js";
import { run as runCheck } from "../check/index.js";
import { run as runScrapeApi } from "../scrape-api/index.js";

export interface SyncOpts {
  out?: string;
  dst?: string;
  summary?: boolean;
  latest?: boolean;
}

function rejectWithoutLatestFlag(): number {
  info("blocked", {
    ok: false,
    reason: "explicit_latest_confirmation_required",
    required_flag: "--latest",
    msg: "sync는 최신 upstream 문서로 managed cache를 갱신하는 명령입니다. 일반 조회에는 필요하지 않습니다.",
  });
  emitGuide({
    use_for: "Prefer existing normalized docs before refreshing from upstream.",
    next_steps: [
      'If the project already has docs/, run `ask "<question>"` or `api --path <path> --method <METHOD>` and let the CLI use that project corpus first.',
      "If project-local docs/ is missing, the CLI will automatically fall back to managed cache and then bundled docs.",
      "Run `sync --latest` only when upstream docs changed and you explicitly need a managed-cache refresh.",
    ],
    caution: "sync performs upstream crawl + normalization + validation. It is intentionally gated to reduce unnecessary network refreshes.",
  });
  return 1;
}

export async function run(opts: SyncOpts): Promise<number> {
  setCmd("sync");
  if (!opts.latest) return rejectWithoutLatestFlag();
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
    maintainer: true,
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
