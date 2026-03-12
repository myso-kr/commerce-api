import fs from "node:fs";
import path from "node:path";
import { debug, error, setCmd, verbose } from "../core/emit.js";
import { run as runTransform } from "../transform/index.js";

const GENERATED_DIRS = ["api", "schema", "category", "guide"] as const;
const GENERATED_FILES = ["llms.txt", "llms-full.txt"] as const;

export interface NormalizeScrapedDocsOpts {
  cmd: string;
  src: string;
  dst: string;
  clean?: boolean;
}

export function normalizeScrapedDocs(opts: NormalizeScrapedDocsOpts): number {
  const src = path.resolve(opts.src);
  const dst = path.resolve(opts.dst);
  const clean = opts.clean ?? true;

  if (pathsOverlap(src, dst)) {
    error("normalize_invalid_paths", {
      src,
      dst,
      msg: "src와 dst는 서로 겹치면 안 됩니다.",
      ok: false,
    });
    return 1;
  }

  verbose("normalize_start", { src, dst, clean });

  if (clean) {
    cleanNormalizedOutput(dst);
    debug("normalize_clean", { dst, ok: true });
  }

  const exitCode = runTransform({ src, dst });
  setCmd(opts.cmd);

  if (exitCode !== 0) {
    error("normalize_done", { src, dst, clean, ok: false });
    return exitCode;
  }

  verbose("normalize_done", { src, dst, clean, ok: true });
  return 0;
}

export function cleanNormalizedOutput(dst: string): void {
  for (const dirName of GENERATED_DIRS) {
    const dirPath = path.join(dst, dirName);
    if (fs.existsSync(dirPath)) fs.rmSync(dirPath, { recursive: true, force: true });
  }

  for (const fileName of GENERATED_FILES) {
    const filePath = path.join(dst, fileName);
    if (fs.existsSync(filePath)) fs.rmSync(filePath, { force: true });
  }
}

function pathsOverlap(left: string, right: string): boolean {
  const rel = path.relative(left, right);
  const reverseRel = path.relative(right, left);
  return rel === "" || reverseRel === "" || isChildPath(rel) || isChildPath(reverseRel);
}

function isChildPath(rel: string): boolean {
  return rel !== "" && !rel.startsWith("..") && !path.isAbsolute(rel);
}
