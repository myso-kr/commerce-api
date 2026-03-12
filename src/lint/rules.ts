/**
 * CONVENTION.md 규칙 기반 린트 체크.
 *
 * 검사 코드:
 *   F1  frontmatter 필수 필드 누락
 *   F2  api-endpoint 전용 필드 누락
 *   F3  description == title
 *   F4  tags 비어 있음
 *   F5  entities 필드 없음
 *   S1  H1 중복
 *   S2  method 코드블록 미변환
 *   S3  ## Request 뒤 컨텍스트 누락
 *   S4  > 원문: 잔존
 *   S5  Direct link to 잔존
 *   N1  UI 탭 목록 잔존
 *   N2  Request Collapse all 잔존
 *   N3  Auth 보일러플레이트 잔존
 *   N4  Array 표기법 잔존
 *   N5  이스케이프 언더스코어 잔존
 *   N6  Docusaurus 링크 잔존
 *   B1  언어 없는 코드블록
 *   B2  동일 스키마 반복 응답코드
 *   C1  카테고리 인덱스 테이블 형식 없음
 *   D1  단락 중복
 */

import fs from "node:fs";
import path from "node:path";
import { resolveReadableDocsRoot } from "../core/paths.js";

export interface Issue {
  code: string;
  level: "ERROR" | "WARN" | "INFO";
  file: string;
  message: string;
}

const REQUIRED_FM_FIELDS = ["doc-id", "title", "description", "type", "source"];
const API_EXTRA_FIELDS   = ["method", "path", "base-url"];

// ── 파싱 헬퍼 ────────────────────────────────────────────────────────────────

export function parseFrontmatter(content: string): Record<string, string> {
  const fm: Record<string, string> = {};
  const stripped = content.trimStart();
  if (!stripped.startsWith("---")) return fm;
  const end = stripped.indexOf("\n---\n", 3);
  if (end === -1) return fm;
  const block = stripped.slice(3, end);
  for (const line of block.split("\n")) {
    const m = line.match(/^([a-zA-Z_-]+):\s*(.*)/);
    if (m) fm[m[1]] = m[2].trim().replace(/^"|"$/g, "");
  }
  // tags 목록 → _tags (join으로 저장)
  const tags = [...block.matchAll(/^\s+- (.+)$/gm)].map(m => m[1].trim());
  if (tags.length) fm["_tags"] = tags.join(",");
  return fm;
}

export function bodyOnly(content: string): string {
  const stripped = content.trimStart();
  if (!stripped.startsWith("---")) return content;
  const end = stripped.indexOf("\n---\n", 3);
  if (end === -1) return content;
  return stripped.slice(end + 5);
}

function stripBoldCode(text: string): string {
  return text.replace(/\*\*[^*\n]+\*\*/g, "").replace(/`[^`\n]+`/g, "");
}

// ── 메인 린트 함수 ───────────────────────────────────────────────────────────

export function lintFile(filePath: string, dst: string = resolveReadableDocsRoot()): Issue[] {
  const issues: Issue[] = [];
  let rel: string;
  try {
    rel = path.relative(dst, filePath);
  } catch {
    rel = filePath;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const fm      = parseFrontmatter(content);
  const body    = bodyOnly(content);
  const pageType = fm["type"] ?? "";

  // ── F ──────────────────────────────────────────────────────────────────────
  const skipSource = pageType === "guide";
  for (const fld of REQUIRED_FM_FIELDS) {
    if (skipSource && fld === "source") continue;
    if (!fm[fld]) issues.push({ code: "F1", level: "ERROR", file: rel, message: `frontmatter 필수 필드 누락: ${fld}` });
  }
  if (pageType === "api-endpoint") {
    for (const fld of API_EXTRA_FIELDS) {
      if (!fm[fld]) issues.push({ code: "F2", level: "ERROR", file: rel, message: `api-endpoint 전용 필드 누락: ${fld}` });
    }
  }
  if (fm["title"] && fm["description"] && fm["title"] === fm["description"])
    issues.push({ code: "F3", level: "WARN", file: rel, message: "description이 title과 동일 (설명 추출 실패로 추정)" });

  if (!fm["_tags"])
    issues.push({ code: "F4", level: "WARN", file: rel, message: "tags가 비어 있음" });

  if (["api-endpoint", "schema"].includes(pageType) && !content.includes("entities:"))
    issues.push({ code: "F5", level: "INFO", file: rel, message: "entities 필드 없음 (검색 리콜 향상에 권장)" });

  // ── S ──────────────────────────────────────────────────────────────────────
  const h1Matches = body.match(/^# .+$/gm) ?? [];
  if (h1Matches.length > 1)
    issues.push({ code: "S1", level: "ERROR", file: rel, message: `H1 제목 중복: ${h1Matches.length}개` });

  if (/^```\s*\n(?:GET|POST|PUT|DELETE|PATCH)\s*\n/m.test(body))
    issues.push({ code: "S2", level: "ERROR", file: rel, message: "HTTP 메서드 코드블록 미변환 (``` METHOD 패턴 잔존)" });

  if (pageType === "api-endpoint" && body.includes("## Request") && !/## Request\n\n\*\*[A-Z]+\*\*/.test(body))
    issues.push({ code: "S3", level: "WARN", file: rel, message: "## Request 뒤 METHOD /path 컨텍스트 누락" });

  if (/^> 원문:/m.test(body))
    issues.push({ code: "S4", level: "ERROR", file: rel, message: "> 원문: 줄 잔존" });

  if (/Direct link to/.test(body))
    issues.push({ code: "S5", level: "ERROR", file: rel, message: '"Direct link to" 앵커 잔존' });

  // ── N ──────────────────────────────────────────────────────────────────────
  if (/^- (?:curl|java|python|php|nodejs)\s*$/im.test(body))
    issues.push({ code: "N1", level: "ERROR", file: rel, message: "UI 탭 목록 잔존 (- curl, - java 등)" });

  if (body.includes("Request Collapse all"))
    issues.push({ code: "N2", level: "ERROR", file: rel, message: "웹 UI 잔재 잔존 (Request Collapse all)" });

  if (/^#### Authorization: oauth2/m.test(body))
    issues.push({ code: "N3", level: "WARN", file: rel, message: "인증 보일러플레이트 잔존" });

  if (/^- Array \[/m.test(body) || /^- \]\s*$/m.test(body))
    issues.push({ code: "N4", level: "WARN", file: rel, message: "- Array [ / - ] 표기법 잔존" });

  const plain = stripBoldCode(content.replace(/^---[\s\S]*?^---\s*/m, ""));
  if (plain.includes("\\_")) {
    const cnt = (plain.match(/\\_/g) ?? []).length;
    issues.push({ code: "N5", level: "WARN", file: rel, message: `이스케이프 언더스코어 잔존: ${cnt}개 (\\_)` });
  }

  if (/\]\(\/docs\//.test(body))
    issues.push({ code: "N6", level: "WARN", file: rel, message: "Docusaurus 내부 링크 잔존 (]/docs/...) — 상대경로로 수정 필요" });

  // ── B ──────────────────────────────────────────────────────────────────────
  let bareCount = 0;
  let inFence = false;
  for (const line of body.split("\n")) {
    if (inFence) {
      if (/^```\s*$/.test(line)) inFence = false;
    } else {
      const m = line.match(/^```(\S*)\s*$/);
      if (m) {
        if (!m[1]) bareCount++;
        inFence = true;
      }
    }
  }
  if (bareCount)
    issues.push({ code: "B1", level: "WARN", file: rel, message: `언어 식별자 없는 코드블록 ${bareCount}개 (블록만 있는 줄)` });

  if (pageType === "api-endpoint") {
    const has400 = /(?:^|\n)(#+.*(?:400|Bad Request))/i.test(body);
    const has403 = /(?:^|\n)(#+.*(?:403|Forbidden))/i.test(body);
    const has500 = /(?:^|\n)(#+.*(?:500|Internal))/i.test(body);
    if (has400 && has403 && has500)
      issues.push({ code: "B2", level: "INFO", file: rel, message: "400/403/500이 각각 별도 섹션 (동일 스키마면 단일 섹션으로 통합 권장)" });
  }

  // ── C ──────────────────────────────────────────────────────────────────────
  if (pageType === "category-index" && !/^\|.+\|/m.test(body))
    issues.push({ code: "C1", level: "WARN", file: rel, message: "카테고리 인덱스에 테이블 형식 없음 (원본 링크 카드 형식 잔존)" });

  // ── D ──────────────────────────────────────────────────────────────────────
  const paras = body.split("\n\n").map(p => p.trim()).filter(p => p.length > 50);
  const seenParas = new Set<string>();
  let dupCount = 0;
  for (const p of paras) {
    if (seenParas.has(p)) dupCount++;
    seenParas.add(p);
  }
  if (dupCount)
    issues.push({ code: "D1", level: "WARN", file: rel, message: `중복 단락 ${dupCount}개 (동일 텍스트 반복)` });

  return issues;
}
