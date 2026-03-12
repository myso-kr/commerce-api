const INLINE_METHOD_BLOCK_RE =
  /(^# .+\n\n)(GET|POST|PUT|DELETE|PATCH)\s*\n\s*\n## (\/[^\n]+?)\s*(\n+)/m;

export function normalizeScrapedMarkdown(markdown: string): string {
  return markdown.replace(
    INLINE_METHOD_BLOCK_RE,
    (_match, heading: string, method: string, apiPath: string, trailing: string) =>
      `${heading}\`\`\`\n${method}\n\n## ${apiPath}\n\`\`\`${trailing}`,
  );
}

export function decodeUrlPathSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}
