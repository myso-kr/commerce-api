/**
 * 런타임 경로 해석 유틸리티.
 *
 * 읽기 명령은 현재 작업 디렉터리의 docs/를 우선 사용하고,
 * 없으면 CLI가 관리하는 synced cache docs/, 마지막으로 패키지에 번들된 docs/로 폴백한다.
 *
 * 쓰기 명령은 기본적으로 현재 작업 디렉터리 기준으로 생성한다.
 * 단, sync는 별도의 managed cache 경로를 기본값으로 사용한다.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PACKAGE_ROOT = path.resolve(__dirname, "..", "..");
export const BUNDLED_DOCS_ROOT = path.join(PACKAGE_ROOT, "docs");
export const OUTPUT_DIR_NAMES = ["api", "schema", "category", "guide"] as const;
const APP_DIR_NAME = "naver-commerce-api-docs-cli";
const LEGACY_APP_DIR_NAMES = ["naver-commerce-api-docs"] as const;

export interface ManagedPathContext {
  platform?: NodeJS.Platform;
  env?: NodeJS.ProcessEnv;
  cwd?: string;
  homeDir?: string;
}

function isDirectory(targetPath: string): boolean {
  try {
    return fs.statSync(targetPath).isDirectory();
  } catch {
    return false;
  }
}

function hasDocsCorpusSignature(docsRoot: string): boolean {
  if (!isDirectory(docsRoot)) return false;
  if (OUTPUT_DIR_NAMES.some((name) => isDirectory(path.join(docsRoot, name)))) return true;
  if (fs.existsSync(path.join(docsRoot, "llms.txt"))) return true;
  if (fs.existsSync(path.join(docsRoot, "llms-full.txt"))) return true;
  return false;
}

function findNearestAncestorDir(startDir: string, childName: string): string | null {
  let current = path.resolve(startDir);
  while (true) {
    const candidate = path.join(current, childName);
    if (hasDocsCorpusSignature(candidate)) return candidate;
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

export function resolveCwdDocsRoot(): string {
  return path.resolve(process.cwd(), "docs");
}

export function resolveCwdRawsRoot(): string {
  return path.resolve(process.cwd(), "raws", "commerce-api", "current");
}

export function resolveCwdRawsBaseDir(): string {
  return path.resolve(process.cwd(), "raws");
}

function readEnvValue(env: NodeJS.ProcessEnv | undefined, key: string): string | undefined {
  const value = env?.[key]?.trim();
  return value ? value : undefined;
}

function getTargetPath(platform: NodeJS.Platform): typeof path.posix | typeof path.win32 {
  return platform === "win32" ? path.win32 : path.posix;
}

function resolveHomeDir(context: ManagedPathContext): string {
  return (
    context.homeDir?.trim() ||
    readEnvValue(context.env, "HOME") ||
    readEnvValue(context.env, "USERPROFILE") ||
    os.homedir() ||
    context.cwd ||
    process.cwd()
  );
}

function resolveManagedStateRootForName(
  appDirName: string,
  context: ManagedPathContext = {},
): string {
  const platform = context.platform ?? process.platform;
  const env = context.env ?? process.env;
  const cwd = context.cwd ?? process.cwd();
  const targetPath = getTargetPath(platform);

  if (platform === "win32") {
    const localAppData = readEnvValue(env, "LOCALAPPDATA");
    if (localAppData) return targetPath.resolve(localAppData, appDirName);

    const home = resolveHomeDir({ ...context, env, cwd });
    return targetPath.resolve(home, "AppData", "Local", appDirName);
  }

  if (platform === "darwin") {
    const xdgCacheHome = readEnvValue(env, "XDG_CACHE_HOME");
    if (xdgCacheHome) return targetPath.resolve(xdgCacheHome, appDirName);

    const home = resolveHomeDir({ ...context, env, cwd });
    return targetPath.resolve(home, "Library", "Caches", appDirName);
  }

  const xdgCacheHome = readEnvValue(env, "XDG_CACHE_HOME");
  if (xdgCacheHome) return targetPath.resolve(xdgCacheHome, appDirName);

  const home = resolveHomeDir({ ...context, env, cwd });
  return targetPath.resolve(home, ".cache", appDirName);
}

export function resolveManagedStateRootFor(context: ManagedPathContext = {}): string {
  return resolveManagedStateRootForName(APP_DIR_NAME, context);
}

export function resolveLegacyManagedStateRootsFor(context: ManagedPathContext = {}): string[] {
  return LEGACY_APP_DIR_NAMES.map((legacyName) => resolveManagedStateRootForName(legacyName, context));
}

export function resolveManagedStateRoot(): string {
  return resolveManagedStateRootFor();
}

export function resolveManagedDocsRoot(): string {
  return path.join(resolveManagedStateRoot(), "docs");
}

export function resolveManagedRawsRoot(): string {
  return path.join(resolveManagedStateRoot(), "raws", "commerce-api", "current");
}

export function resolveReadableDocsRoot(targetPath?: string): string {
  if (targetPath) return path.resolve(targetPath);
  const nearestProjectDocs = findNearestAncestorDir(process.cwd(), "docs");
  if (nearestProjectDocs) return nearestProjectDocs;

  const managedDocs = resolveManagedDocsRoot();
  if (hasDocsCorpusSignature(managedDocs)) return managedDocs;

  for (const legacyRoot of resolveLegacyManagedStateRootsFor()) {
    const legacyManagedDocs = path.join(legacyRoot, "docs");
    if (hasDocsCorpusSignature(legacyManagedDocs)) return legacyManagedDocs;
  }

  return BUNDLED_DOCS_ROOT;
}

export function resolveWritableDocsRoot(targetPath?: string): string {
  return targetPath ? path.resolve(targetPath) : resolveCwdDocsRoot();
}

export function resolveWritableRawsRoot(targetPath?: string): string {
  return targetPath ? path.resolve(targetPath) : resolveCwdRawsRoot();
}

export function resolveWritableRawsBaseDir(targetPath?: string): string {
  return targetPath ? path.resolve(targetPath) : resolveCwdRawsBaseDir();
}

export function resolveOutputDirs(docsRoot: string): string[] {
  return OUTPUT_DIR_NAMES.map((name) => path.join(docsRoot, name));
}
