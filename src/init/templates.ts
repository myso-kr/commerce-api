import fs from "node:fs";
import path from "node:path";
import { PACKAGE_ROOT } from "../core/paths.js";

const TEMPLATE_FILE = path.join(PACKAGE_ROOT, "SKILLS.md");

const SECTION_NAMES = [
  "codex-skill",
  "claude-skill",
  "gemini-skill",
  "cursor-rule",
  "agents-block",
  "claude-block",
  "gemini-block",
] as const;

type SectionName = (typeof SECTION_NAMES)[number];

export interface InitTemplates {
  codexSkill: string;
  claudeSkill: string;
  geminiSkill: string;
  cursorRule: string;
  agentsBlock: string;
  claudeBlock: string;
  geminiBlock: string;
}

let cachedTemplates: InitTemplates | null = null;

export function loadInitTemplates(): InitTemplates {
  if (cachedTemplates) return cachedTemplates;

  const content = fs.readFileSync(TEMPLATE_FILE, "utf-8").replace(/\r\n/g, "\n");
  const sections = new Map<SectionName, string>();
  const pattern = /<!-- template:([a-z0-9-]+):start -->\n?([\s\S]*?)\n?<!-- template:\1:end -->/g;

  for (const match of content.matchAll(pattern)) {
    const section = match[1];
    if (!isSectionName(section)) continue;
    sections.set(section, ensureTrailingNewline(match[2].trim()));
  }

  for (const section of SECTION_NAMES) {
    if (!sections.has(section)) {
      throw new Error(`SKILLS.md 템플릿 섹션이 없음: ${section}`);
    }
  }

  cachedTemplates = {
    codexSkill: sections.get("codex-skill")!,
    claudeSkill: sections.get("claude-skill")!,
    geminiSkill: sections.get("gemini-skill")!,
    cursorRule: sections.get("cursor-rule")!,
    agentsBlock: sections.get("agents-block")!,
    claudeBlock: sections.get("claude-block")!,
    geminiBlock: sections.get("gemini-block")!,
  };

  return cachedTemplates;
}

function isSectionName(value: string): value is SectionName {
  return SECTION_NAMES.includes(value as SectionName);
}

function ensureTrailingNewline(value: string): string {
  return value.replace(/\s*$/, "\n");
}
