/**
 * 잔여 노이즈 패턴 검사 함수 모음.
 */

import fs from "node:fs";
import path from "node:path";
import { verbose, warn } from "../core/emit.js";
import { resolveOutputDirs } from "../core/paths.js";

function* iterOutputMd(docs: string): Generator<string> {
  for (const dir of resolveOutputDirs(docs)) {
    if (fs.existsSync(dir)) yield* walkMd(dir);
  }
}

function* walkMd(dir: string): Generator<string> {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walkMd(full);
    else if (entry.isFile() && entry.name.endsWith(".md")) yield full;
  }
}

function isInCodeBlock(content: string, matchStart: number): boolean {
  const before = content.slice(0, matchStart);
  const fences = before.match(/^```/gm) ?? [];
  return fences.length % 2 === 1;
}

function relPath(docs: string, filePath: string): string {
  try { return path.relative(docs, filePath); } catch { return filePath; }
}

// ── 1. escaped_underscore ────────────────────────────────────────────────────

export function checkEscapedUnderscores(docs: string): number {
  const pattern = /\\_/g;
  let totalOutside = 0, totalInside = 0, filesWithOutside = 0;

  for (const md of iterOutputMd(docs)) {
    const content = fs.readFileSync(md, "utf-8");
    const matches = [...content.matchAll(pattern)];
    if (!matches.length) continue;

    const outside = matches.filter(m => !isInCodeBlock(content, m.index!));
    const inside  = matches.filter(m =>  isInCodeBlock(content, m.index!));
    totalOutside += outside.length;
    totalInside  += inside.length;

    if (outside.length) {
      filesWithOutside++;
      warn("escaped_underscore", { file: relPath(docs, md), count_outside: outside.length, count_inside: inside.length, ok: false });
    }
  }
  verbose("escaped_underscores_done", { total_outside: totalOutside, total_inside: totalInside, files: filesWithOutside, ok: totalOutside === 0 });
  return totalOutside;
}

// ── 2. docusaurus_link ───────────────────────────────────────────────────────

export function checkDocusaurusLinks(docs: string): number {
  const bodyPattern = /\]\(\/docs\/[^\s)"]+\)/g;
  const fmPattern   = /^description:.*?\/docs\//m;
  let filesFound = 0;

  for (const md of iterOutputMd(docs)) {
    const content = fs.readFileSync(md, "utf-8");
    const parts = content.split("---");
    const body  = parts.length >= 3 ? parts.slice(2).join("---") : content;
    const rel   = relPath(docs, md);

    const matches = [...body.matchAll(bodyPattern)];
    if (matches.length) {
      filesFound++;
      warn("docusaurus_link", { file: rel, count: matches.length, ok: false });
    }
    if (fmPattern.test(content))
      warn("docusaurus_link_fm", { file: rel, msg: "frontmatter description에 /docs/ 링크", ok: false });
  }
  verbose("docusaurus_links_done", { files: filesFound, ok: filesFound === 0 });
  return filesFound;
}

// ── 3. raw_method_block ───────────────────────────────────────────────────────

export function checkRawMethodBlocks(docs: string): number {
  const pattern = /^```\s*\n(GET|POST|PUT|DELETE|PATCH)\s+\//gm;
  let filesFound = 0;

  for (const md of iterOutputMd(docs)) {
    const content = fs.readFileSync(md, "utf-8");
    const matches = [...content.matchAll(pattern)];
    if (matches.length) {
      filesFound++;
      warn("raw_method_block", { file: relPath(docs, md), count: matches.length, ok: false });
    }
  }
  verbose("raw_method_blocks_done", { files: filesFound, ok: filesFound === 0 });
  return filesFound;
}

// ── 4. ui_tabs ────────────────────────────────────────────────────────────────

export function checkUiTabs(docs: string): number {
  const patterns: [RegExp, string][] = [
    [/:::tabs/, "Docusaurus tabs directive"],
    [/import Tabs/, "import Tabs"],
    [/<TabItem/, "TabItem JSX"],
    [/\[\u200b\]/, "invisible space in link"],
  ];
  let totalFiles = 0;

  for (const [pattern, label] of patterns) {
    let found = 0;
    for (const md of iterOutputMd(docs)) {
      const content = fs.readFileSync(md, "utf-8");
      if (pattern.test(content)) {
        found++;
        warn("ui_tab", { file: relPath(docs, md), pattern: label, ok: false });
      }
    }
    verbose("ui_tab_pattern", { pattern: label, files: found, ok: found === 0 });
    totalFiles += found;
  }
  return totalFiles;
}

// ── 5. direct_link_anchor ────────────────────────────────────────────────────

export function checkDirectLinkAnchor(docs: string): number {
  const pattern = /Direct link to/g;
  let filesFound = 0;

  for (const md of iterOutputMd(docs)) {
    const content = fs.readFileSync(md, "utf-8");
    const matches = [...content.matchAll(pattern)];
    if (matches.length) {
      filesFound++;
      warn("direct_link_anchor", { file: relPath(docs, md), count: matches.length, ok: false });
    }
  }
  verbose("direct_link_anchors_done", { files: filesFound, ok: filesFound === 0 });
  return filesFound;
}

// ── 6. 파일 수 통계 ──────────────────────────────────────────────────────────

export function countOutputFiles(docs: string): void {
  const counts: Record<string, number> = {};
  let total = 0;
  for (const dir of resolveOutputDirs(docs)) {
    if (fs.existsSync(dir)) {
      const count = [...walkMd(dir)].length;
      counts[path.basename(dir)] = count;
      total += count;
    }
  }
  verbose("file_count", { total, ...counts });
}
