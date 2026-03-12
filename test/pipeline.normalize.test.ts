import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { setCmd } from "../src/core/emit.js";
import { normalizeScrapedDocs } from "../src/pipeline/normalize.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function makeTempDir(prefix: string) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

describe("normalizeScrapedDocs", () => {
  it("cleans generated output and writes normalized docs", () => {
    const tmpRoot = makeTempDir("naver-commerce-api-docs-normalize-");
    const srcRoot = path.join(tmpRoot, "raws");
    const dstRoot = path.join(tmpRoot, "docs");

    fs.mkdirSync(srcRoot, { recursive: true });
    fs.mkdirSync(path.join(dstRoot, "api", "legacy"), { recursive: true });
    fs.writeFileSync(path.join(dstRoot, "api", "legacy", "stale.md"), "# stale\n", "utf-8");
    fs.writeFileSync(path.join(dstRoot, "llms.txt"), "stale\n", "utf-8");

    fs.copyFileSync(
      path.join(ROOT, "raws", "commerce-api", "current", "create-product-product.md"),
      path.join(srcRoot, "create-product-product.md"),
    );

    setCmd("scrape-api");
    const code = normalizeScrapedDocs({
      cmd: "scrape-api",
      src: srcRoot,
      dst: dstRoot,
    });

    expect(code).toBe(0);
    expect(fs.existsSync(path.join(dstRoot, "api", "legacy", "stale.md"))).toBe(false);
    expect(fs.existsSync(path.join(dstRoot, "api", "v2", "products.POST.md"))).toBe(true);
    expect(fs.existsSync(path.join(dstRoot, "llms.txt"))).toBe(true);
    expect(fs.existsSync(path.join(dstRoot, "llms-full.txt"))).toBe(true);
  });

  it("rejects overlapping src and dst paths", () => {
    const tmpRoot = makeTempDir("naver-commerce-api-docs-overlap-");

    setCmd("scrape");
    const code = normalizeScrapedDocs({
      cmd: "scrape",
      src: tmpRoot,
      dst: path.join(tmpRoot, "docs"),
    });

    expect(code).toBe(1);
  });
});
