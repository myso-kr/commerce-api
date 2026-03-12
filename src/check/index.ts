import { info, setCmd, verbose } from "../core/emit.js";
import { emitGuide } from "../core/guide.js";
import { run as runLint, type LintOpts } from "../lint/index.js";
import { run as runNoise } from "../noise/index.js";
import { run as runReview } from "../review/index.js";

export interface CheckAllOpts {
  src?: string;
  dst?: string;
  fix?: boolean;
  summary?: boolean;
  guide?: boolean;
}

export function run(opts: CheckAllOpts): number {
  setCmd("check");
  const summary = opts.summary ?? true;
  const fix = opts.fix ?? false;
  const shouldEmitGuide = opts.guide ?? true;

  verbose("start", {
    src: opts.src ?? null,
    dst: opts.dst ?? null,
    fix,
    summary,
  });

  const lintCode = runLint({
    src: opts.src,
    dst: opts.dst,
    fix,
    summary,
    guide: false,
  } satisfies LintOpts);
  const reviewCode = runReview({ dst: opts.dst, guide: false });
  const noiseCode = runNoise({ dst: opts.dst, guide: false });

  const ok = lintCode === 0 && reviewCode === 0 && noiseCode === 0;
  setCmd("check");
  info("done", {
    lint_ok: lintCode === 0,
    review_ok: reviewCode === 0,
    noise_ok: noiseCode === 0,
    ok,
  });
  if (shouldEmitGuide) {
    emitGuide({
      use_for: "Use check all as the agent-facing validation gate before publishing or serving docs.",
      next_steps: [
        "Inspect any WARN or ERROR events emitted by lint, review, or noise before trusting the corpus.",
        "Run `ask --format compact \"<question>\"` against the validated docs to verify retrieval quality.",
        "Run `api --path <path> --method <METHOD> --body` for exact endpoint grounding after validation.",
      ],
      caution: ok
        ? undefined
        : "At least one validation stage failed. Treat the corpus as partially trusted until the failing stage is resolved.",
    });
  }
  return ok ? 0 : 1;
}
