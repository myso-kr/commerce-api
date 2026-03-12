/**
 * docs/ 전체 품질 검토 체크 함수 모음.
 *
 * 8개 체크 함수가 JSONL emit으로 결과를 출력한다.
 */

import fs from "node:fs";
import path from "node:path";
import { error, verbose, warn } from "../core/emit.js";
import { parseFrontmatter } from "../core/frontmatter.js";

const REQUIRED_FM_ALL = new Set([
  "doc-id", "title", "description", "type", "status", "updated", "source",
]);
const REQUIRED_FM_API = new Set([
  "method", "path", "base-url", "category", "tags",
]);

function* iterMd(docs: string): Generator<string> {
  const entries = fs.readdirSync(docs, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(docs, e.name);
    if (e.isDirectory()) yield* iterMd(full);
    else if (e.isFile() && e.name.endsWith(".md")) yield full;
  }
}

function relTo(filePath: string, docs: string): string {
  try {
    return path.relative(docs, filePath).replace(/\\/g, "/");
  } catch {
    return filePath;
  }
}

// ── 1. 파일 수 / 구조 ────────────────────────────────────────────────────────

export function checkStructure(docs: string): void {
  const subdirs: Record<string, string> = {
    api: path.join(docs, "api"),
    schema: path.join(docs, "schema"),
    category: path.join(docs, "category"),
    guide: path.join(docs, "guide"),
  };

  let total = 0;
  const counts: Record<string, number> = {};
  for (const [name, d] of Object.entries(subdirs)) {
    const files = fs.existsSync(d)
      ? [...iterMd(d)]
      : [];
    counts[name] = files.length;
    total += files.length;
  }

  verbose("structure", { total, ...counts });

  for (const fname of ["llms.txt", "llms-full.txt"]) {
    const p = path.join(docs, fname);
    if (fs.existsSync(p)) {
      verbose("llms_file", { file: fname, size: fs.statSync(p).size });
    } else {
      warn("llms_file", { file: fname, msg: "파일 없음", ok: false });
    }
  }
}

// ── 2. 내부 링크 유효성 ───────────────────────────────────────────────────────

export function checkLinks(docs: string): number {
  let dead = 0;
  let checked = 0;
  const linkPat = /\[([^\]]*)\]\(([^)#\s][^)\s]*)\)/g;

  for (const md of iterMd(docs)) {
    const content = fs.readFileSync(md, "utf-8");
    const [, body] = parseFrontmatter(content);
    for (const m of body.matchAll(linkPat)) {
      const href = m[2];
      if (href.startsWith("http") || href.startsWith("mailto") || href.startsWith("#")) continue;
      const target = path.resolve(path.dirname(md), href);
      checked++;
      if (!fs.existsSync(target)) {
        warn("dead_link", { file: relTo(md, docs), href, ok: false });
        dead++;
      }
    }
  }

  verbose("links_done", { checked, dead, ok: dead === 0 });
  return dead;
}

// ── 3. frontmatter 완전성 ─────────────────────────────────────────────────────

export function checkFrontmatter(docs: string): void {
  let missingRequired = 0;
  let missingApi = 0;

  for (const md of iterMd(docs)) {
    const content = fs.readFileSync(md, "utf-8");
    const [fm] = parseFrontmatter(content);
    const rel = relTo(md, docs);

    if (!fm || Object.keys(fm).length === 0) {
      warn("frontmatter", { file: rel, msg: "frontmatter 없음", ok: false });
      missingRequired++;
      continue;
    }

    const pageType = String(fm["type"] ?? "");
    const required = new Set(REQUIRED_FM_ALL);
    if (pageType === "guide") required.delete("source");

    const missing = [...required].filter((k) => !(k in fm));
    if (missing.length > 0) {
      warn("frontmatter", {
        file: rel,
        msg: `필수 필드 누락: ${JSON.stringify(missing.sort())}`,
        ok: false,
      });
      missingRequired++;
    }

    if (pageType === "api-endpoint") {
      const m2 = [...REQUIRED_FM_API].filter((k) => !(k in fm));
      if (m2.length > 0) {
        warn("frontmatter_api", {
          file: rel,
          msg: `API 전용 필드 누락: ${JSON.stringify(m2.sort())}`,
          ok: false,
        });
        missingApi++;
      }
    }
  }

  verbose("frontmatter_done", {
    missing_required: missingRequired,
    missing_api: missingApi,
    ok: missingRequired === 0 && missingApi === 0,
  });
}

// ── 4. 내용 이상 패턴 ────────────────────────────────────────────────────────

export function checkContent(docs: string): void {
  const htmlPat = /<(?:div|span|table|tr|td|th|ul|li|p|br)\b/i;
  let tooShort = 0;
  let noH1 = 0;
  let multiH1 = 0;
  let hasHtml = 0;

  for (const md of iterMd(docs)) {
    const content = fs.readFileSync(md, "utf-8");
    const [, body] = parseFrontmatter(content);
    const rel = relTo(md, docs);

    if (body.trim().length < 100) {
      warn("content", { file: rel, msg: "본문 100자 미만", ok: false });
      tooShort++;
    }

    const h1s = [...body.matchAll(/^# .+/gm)];
    if (h1s.length === 0) {
      warn("content", { file: rel, msg: "H1 없음", ok: false });
      noH1++;
    } else if (h1s.length > 1) {
      warn("content", { file: rel, msg: `H1 중복: ${h1s.length}개`, ok: false });
      multiH1++;
    }

    if (htmlPat.test(body)) {
      warn("content", { file: rel, msg: "HTML 태그 잔존", ok: false });
      hasHtml++;
    }
  }

  verbose("content_done", {
    too_short: tooShort,
    no_h1: noH1,
    multi_h1: multiH1,
    has_html: hasHtml,
    ok: tooShort === 0 && noH1 === 0 && multiH1 === 0 && hasHtml === 0,
  });
}

// ── 5. llms.txt 정합성 ───────────────────────────────────────────────────────

export function checkLlms(docs: string): void {
  const llmsPath = path.join(docs, "llms.txt");
  if (!fs.existsSync(llmsPath)) {
    error("llms", { file: "llms.txt", msg: "파일 없음", ok: false });
    return;
  }

  const content = fs.readFileSync(llmsPath, "utf-8");
  const links = [...content.matchAll(/\(([^)]+\.md)\)/g)].map((m) => m[1]);
  const broken: string[] = [];
  for (const link of links) {
    const target = path.resolve(docs, link);
    if (!fs.existsSync(target)) broken.push(link);
  }

  const sections = [...content.matchAll(/^## .+/gm)];
  const entries = [...content.matchAll(/^- \[/gm)];

  for (const b of broken) {
    warn("llms_link", { file: "llms.txt", href: b, ok: false });
  }

  verbose("llms_done", {
    sections: sections.length,
    entries: entries.length,
    links: links.length,
    broken: broken.length,
    ok: broken.length === 0,
  });
}

// ── 6. 카테고리 인덱스 링크 ──────────────────────────────────────────────────

export function checkCategoryLinks(docs: string): void {
  const catDir = path.join(docs, "category");
  if (!fs.existsSync(catDir)) {
    warn("category_links", { msg: "category/ 없음", ok: false });
    return;
  }

  let total = 0;
  let dead = 0;
  const linkPat = /\[([^\]]+)\]\(([^)]+)\)/g;

  for (const entry of fs.readdirSync(catDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;
    const md = path.join(catDir, entry.name);
    const content = fs.readFileSync(md, "utf-8");
    const [, body] = parseFrontmatter(content);
    const rel = relTo(md, docs);

    for (const m of body.matchAll(linkPat)) {
      const href = m[2];
      if (href.startsWith("http") || href.startsWith("#")) continue;
      total++;
      const target = path.resolve(path.dirname(md), href);
      if (!fs.existsSync(target)) {
        warn("category_link", { file: rel, href, ok: false });
        dead++;
      }
    }
  }

  verbose("category_links_done", { total, dead, ok: dead === 0 });
}

// ── 7. doc-id 중복 ───────────────────────────────────────────────────────────

export function checkDocIdUniqueness(docs: string): void {
  const idMap = new Map<string, string[]>();

  for (const md of iterMd(docs)) {
    const content = fs.readFileSync(md, "utf-8");
    const [fm] = parseFrontmatter(content);
    const docId = String(fm["doc-id"] ?? "");
    if (!docId) continue;
    const rel = relTo(md, docs);
    if (!idMap.has(docId)) idMap.set(docId, []);
    idMap.get(docId)!.push(rel);
  }

  let dups = 0;
  for (const [did, paths] of idMap) {
    if (paths.length > 1) {
      warn("doc_id_dup", { doc_id: did, files: paths, ok: false });
      dups++;
    }
  }

  verbose("doc_id_done", {
    total: idMap.size,
    duplicates: dups,
    ok: dups === 0,
  });
}

// ── 8. API 파일 method/path 형식 ─────────────────────────────────────────────

export function checkApiFormat(docs: string): void {
  const apiDir = path.join(docs, "api");
  if (!fs.existsSync(apiDir)) {
    warn("api_format", { msg: "api/ 없음", ok: false });
    return;
  }

  const validMethods = new Set(["GET", "POST", "PUT", "PATCH", "DELETE"]);
  let badMethod = 0;
  let badPath = 0;

  for (const md of iterMd(apiDir)) {
    const content = fs.readFileSync(md, "utf-8");
    const [fm] = parseFrontmatter(content);
    if (!fm || fm["type"] !== "api-endpoint") continue;
    const rel = relTo(md, docs);
    const method = String(fm["method"] ?? "");
    const apiPath = String(fm["path"] ?? "");
    if (!validMethods.has(method)) {
      warn("api_method", { file: rel, method, ok: false });
      badMethod++;
    }
    if (!apiPath.startsWith("/")) {
      warn("api_path", { file: rel, path: apiPath, ok: false });
      badPath++;
    }
  }

  verbose("api_format_done", {
    bad_method: badMethod,
    bad_path: badPath,
    ok: badMethod === 0 && badPath === 0,
  });
}
