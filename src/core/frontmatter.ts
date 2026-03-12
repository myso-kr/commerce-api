import * as yaml from "js-yaml";

export function parseFrontmatter(content: string): [Record<string, unknown>, string] {
  if (!content.startsWith("---")) return [{}, content];
  const end = content.indexOf("\n---", 3);
  if (end === -1) return [{}, content];
  const fmRaw = content.slice(3, end).trim();
  const body = content.slice(end + 4).trim();

  try {
    const fm = (yaml.load(fmRaw) as Record<string, unknown>) ?? {};
    return [fm, body];
  } catch {
    const fm: Record<string, string> = {};
    for (const line of fmRaw.split("\n")) {
      const match = line.match(/^([a-zA-Z_-]+):\s*(.*)/);
      if (match) fm[match[1]] = match[2].trim().replace(/^"|"$/g, "");
    }
    return [fm, body];
  }
}
