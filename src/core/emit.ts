/**
 * JSONL stdout 이미터.
 *
 * 출력 형식 (한 줄 = 하나의 JSON 객체):
 *   {"ts":"...Z","level":"DEBUG|INFO|WARN|ERROR","cmd":"...","event":"...","key":value,...}
 */

let _cmd = "";
let _mode: OutputMode = "default";

export function setCmd(cmd: string): void {
  _cmd = cmd;
}

export type OutputMode = "default" | "verbose" | "debug";
type Level = "DEBUG" | "INFO" | "WARN" | "ERROR";
type Visibility = "always" | "verbose" | "debug";

export function setOutputMode(mode: OutputMode): void {
  _mode = mode;
}

function shouldEmit(level: Level, visibility: Visibility): boolean {
  if (level === "WARN" || level === "ERROR") return true;
  if (visibility === "always") return true;
  if (_mode === "debug") return true;
  if (_mode === "verbose") return visibility === "verbose";
  return false;
}

export function emit(
  level: Level,
  event: string,
  data: Record<string, unknown> = {},
  visibility: Visibility = "always",
): void {
  if (!shouldEmit(level, visibility)) return;
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    cmd: _cmd,
    event,
    ...data,
  });
  process.stdout.write(line + "\n");
}

export function info(event: string, data?: Record<string, unknown>): void {
  emit("INFO", event, data, "always");
}

export function verbose(event: string, data?: Record<string, unknown>): void {
  emit("INFO", event, data, "verbose");
}

export function debug(event: string, data?: Record<string, unknown>): void {
  emit("DEBUG", event, data, "debug");
}

export function warn(event: string, data?: Record<string, unknown>): void {
  emit("WARN", event, data, "always");
}

export function error(event: string, data?: Record<string, unknown>): void {
  emit("ERROR", event, data, "always");
}
