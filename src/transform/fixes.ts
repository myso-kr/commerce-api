/**
 * 콘텐츠 정리 및 변환 함수 모음.
 */

// ── 노이즈 제거 ───────────────────────────────────────────────────────────────

export function removeSourceLine(content: string): string {
  return content.replace(/^> 원문: https?:\/\/\S+\s*\n?/gm, "");
}

export function dedupH1(content: string): string {
  const matches = [...content.matchAll(/^# .+$/gm)];
  if (matches.length <= 1) return content;
  const firstEnd = matches[0].index! + matches[0][0].length;
  const head = content.slice(0, firstEnd);
  let tail = content.slice(firstEnd);
  tail = tail.replace(/^# .+\n?/gm, "");
  return head + tail;
}

export function removeDirectLinks(content: string): string {
  // Zero-width space variants
  content = content.replace(/\[\u200b\]\(#[^)]+\)/g, "");
  content = content.replace(/\[​\]\(#[^)]+\)/g, "");
  content = content.replace(/\[#\]\(#[^"]+?"Direct link to[^"]*"\)/g, "");
  content = content.replace(/\[\u200b\]\(#[^"]+?"[^"]*"\)/g, "");
  content = content.replace(/\[​\]\(#[^"]+?"[^"]*"\)/g, "");
  content = content.replace(/\[​?\]\(#\S+(?:\s+"[^"]*")?\)/g, "");
  return content;
}

export function removeUiTabs(content: string): string {
  content = content.replace(
    /^- (curl|java|python|php|nodejs|csharp|kotlin|javascript|ruby|go|C#|Kotlin)\s*$/gim,
    "",
  );
  content = content.replace(
    /^- (Schema|Example \(auto\)|CURL|Example)\s*$/gm,
    "",
  );
  return content;
}

export function removeApplicationTypeLines(content: string): string {
  return content.replace(/^- application\/[^\n]+\s*\n/gm, "");
}

export function removeStatusCodeList(content: string): string {
  return content.replace(/(?:^- \d{3}\s*\n){2,}/gm, "");
}

export function removeSchemaLabels(content: string): string {
  return content.replace(/^\*\*Schema\*\*\s*\n/gm, "");
}

export function removeWebUiWidget(content: string): string {
  return content
    .replace(/^[ \t]*Request Collapse all[ \t]*\r?\n/gm, "")
    .replace(/^[ \t]*(Base URL|Edit|Auth|Bearer Token)[ \t]*\r?\n/gm, "");
}

export function removeAuthBoilerplate(content: string): string {
  return content.replace(
    /^#### Authorization: oauth2\s*\n(?:(?!\n##|\n#).*\n)*/gm,
    "",
  );
}

export function removeArrayNotation(content: string): string {
  content = content.replace(/^- Array \[\s*\n/gm, "");
  content = content.replace(/^- \]\s*\n/gm, "");
  return content;
}

// ── HTTP 메서드 블록 변환 ─────────────────────────────────────────────────────

export function convertMethodBlock(
  content: string,
  method: string,
  apiPath: string,
  baseUrl: string,
  rawPath = "",
): string {
  if (!method || !apiPath) return content;
  const fullUrl = `${baseUrl}${apiPath}`;
  const replacement = `> **${method}** \`${fullUrl}\``;
  const matchPath = rawPath || apiPath;
  const pattern = new RegExp(
    "```\\s*\\n" +
      escapeRegex(method) +
      "\\s*\\n\\n## " +
      escapeRegex(matchPath) +
      "\\s*\\n```",
  );
  const fencedConverted = content.replace(pattern, replacement);
  if (fencedConverted !== content) return fencedConverted;

  const plainPattern = new RegExp(
    `(^|\\n)${escapeRegex(method)}\\s*\\n\\s*\\n## ${escapeRegex(matchPath)}\\s*(\\n|$)`,
  );
  return content.replace(plainPattern, `$1${replacement}$2`);
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function addH2Context(
  content: string,
  method: string,
  apiPath: string,
): string {
  if (!method || !apiPath) return content;
  content = content.replace(/^## Request\s*$/gm, `## Request\n\n**${method}** \`${apiPath}\``);
  content = content.replace(
    /^## Responses\s*$/gm,
    `## Responses\n\n**${method}** \`${apiPath}\` — 응답`,
  );
  return content;
}

// ── 이스케이프 수정 ───────────────────────────────────────────────────────────

export function fixEscapedUnderscores(content: string): string {
  content = content.replace(/\*\*([^*]+)\*\*/g, (_m, inner: string) =>
    "**" + inner.replace(/\\_/g, "_") + "**",
  );
  content = content.replace(/`([^`\n]+)`/g, (_m, inner: string) =>
    "`" + inner.replace(/\\_/g, "_") + "`",
  );

  const lines = content.split("\n");
  let inFence = false;
  const result: string[] = [];
  for (let line of lines) {
    if (line.trim().startsWith("```")) inFence = !inFence;
    if (!inFence) line = line.replace(/\\_/g, "_");
    result.push(line);
  }
  return result.join("\n");
}

// ── 코드블록 정리 ─────────────────────────────────────────────────────────────

export function inferCodeLanguage(block: string): string {
  const s = block.trim();
  if (/^\s*[\[{]/.test(s)) return "json";
  if (/^curl\s/.test(s)) return "bash";
  if (/^#!\//.test(s)) return "bash";
  if (/^(?:GET|POST|PUT|DELETE|PATCH)\s+\//.test(s)) return "http";
  return "";
}

export function fixBareCodeBlocks(content: string): string {
  return content.replace(
    /^```[ \t]*\n([\s\S]*?)^```[ \t]*\n?/gm,
    (_match, blockContent: string) => {
      const s = blockContent.trim();
      if (!s) return "";

      const lang = inferCodeLanguage(blockContent);
      if (lang) return `\`\`\`${lang}\n${blockContent}\`\`\`\n`;

      if (/[가-힣]/.test(s)) return s + "\n";
      if (
        /^(?:Bad [Rr]equest|Unauthorized|Forbidden|Not [Ff]ound|Internal Server Error|Method Not Allowed|Not Acceptable|Unsupported)/.test(
          s,
        )
      )
        return s + "\n";

      return _match;
    },
  );
}

// ── 중복 / 공백 정리 ──────────────────────────────────────────────────────────

export function dedupRepeatedParagraphs(content: string): string {
  const paras = content.split("\n\n");
  const seen = new Set<string>();
  const result: string[] = [];
  for (const para of paras) {
    const stripped = para.trim();
    if (stripped.length > 50) {
      if (seen.has(stripped)) continue;
      seen.add(stripped);
    }
    result.push(para);
  }
  return result.join("\n\n");
}

export function ensureCategoryIndexIntro(content: string, title: string): string {
  if (content.includes("카테고리 인덱스입니다")) return content;
  if (content.trim().length >= 140) return content;

  const intro =
    `${title} 관련 API 문서를 빠르게 찾을 수 있도록 정리한 카테고리 인덱스입니다. ` +
    "아래 링크를 따라 세부 문서로 이동할 수 있습니다.";

  if (/^# .+$/m.test(content)) {
    return content.replace(/^# .+\n+/m, (match) => `${match}${intro}\n\n`);
  }
  return `${intro}\n\n${content}`;
}

export function cleanBlankLines(content: string): string {
  content = content.replace(/\n{4,}/g, "\n\n\n");
  return content.trim() + "\n";
}
