import { info } from "./emit.js";

export interface AgentGuide {
  use_for: string;
  next_steps: string[];
  caution?: string;
  artifacts?: string[];
}

export function emitGuide(guide: AgentGuide): void {
  info("guide", {
    audience: "agent",
    ...guide,
  });
}
