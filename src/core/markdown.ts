/**
 * HTML → Markdown 변환 유틸리티.
 *
 * Python markdownify + BeautifulSoup 파이프라인을 Turndown + cheerio로 구현한다.
 */

import * as cheerio from "cheerio";
import TurndownService from "turndown";

// ── Turndown 인스턴스 (싱글턴) ───────────────────────────────────────────────

interface TurndownElementLike {
  nodeName: string;
  firstChild: TurndownElementLike | null;
  getAttribute?: (name: string) => string | null;
  textContent?: string | null;
}

const td = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
});

// 코드 블록 언어 감지: class="language-xxx" → lang
td.addRule("fencedCodeBlockWithLang", {
  filter(node) {
    return (
      node.nodeName === "PRE" &&
      node.firstChild !== null &&
      (node.firstChild as TurndownElementLike).nodeName === "CODE"
    );
  },
  replacement(_content, node) {
    const code = node.firstChild as TurndownElementLike;
    const cls = code.getAttribute?.("class") ?? "";
    const langMatch = cls.match(/language-(\S+)/);
    const lang = langMatch ? langMatch[1] : "";
    const text = code.textContent ?? "";
    return `\n\`\`\`${lang}\n${text}\n\`\`\`\n`;
  },
});

// script/style/nav/aside/header/footer 제거
td.remove(["script", "style", "nav", "aside", "header", "footer"]);

// ── <br> → \n (<pre> 안) ────────────────────────────────────────────────────

function fixPreBr(html: string): string {
  const $ = cheerio.load(html);
  $("pre").each((_i, el) => {
    $(el)
      .find("br")
      .replaceWith("\n");
  });
  return $.html();
}

// ── 메인 변환 ────────────────────────────────────────────────────────────────

export function htmlToMarkdown(html: string): string {
  const cleaned = fixPreBr(html);
  let md = td.turndown(cleaned);
  // 3줄 이상 연속 빈 줄 → 2줄
  md = md.replace(/\n{3,}/g, "\n\n");
  return md.trim();
}

// ── slugify (파일명 안전화) ──────────────────────────────────────────────────

export function slugify(text: string): string {
  // Windows 금지 문자 및 공백 → _
  let s = text.replace(/[/\\:*?"<>|\s]/g, "_");
  // 연속 _ 제거
  s = s.replace(/_+/g, "_");
  return s.toLowerCase();
}
