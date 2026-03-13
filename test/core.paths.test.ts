import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { resolveManagedStateRootFor, resolveReadableDocsRoot } from "../src/core/paths.js";

describe("core paths", () => {
  it("uses LOCALAPPDATA on Windows", () => {
    const root = resolveManagedStateRootFor({
      platform: "win32",
      env: {
        LOCALAPPDATA: "C:\\Users\\alice\\AppData\\Local",
      },
      homeDir: "C:\\Users\\alice",
    });

    expect(root).toBe("C:\\Users\\alice\\AppData\\Local\\naver-commerce-api-docs-cli");
  });

  it("falls back to USERPROFILE on Windows", () => {
    const root = resolveManagedStateRootFor({
      platform: "win32",
      env: {
        USERPROFILE: "C:\\Users\\alice",
      },
    });

    expect(root).toBe("C:\\Users\\alice\\AppData\\Local\\naver-commerce-api-docs-cli");
  });

  it("uses Library/Caches on macOS", () => {
    const root = resolveManagedStateRootFor({
      platform: "darwin",
      env: {
        HOME: "/Users/alice",
      },
    });

    expect(root).toBe("/Users/alice/Library/Caches/naver-commerce-api-docs-cli");
  });

  it("prefers XDG cache on macOS when provided", () => {
    const root = resolveManagedStateRootFor({
      platform: "darwin",
      env: {
        HOME: "/Users/alice",
        XDG_CACHE_HOME: "/Users/alice/.cache-alt",
      },
    });

    expect(root).toBe("/Users/alice/.cache-alt/naver-commerce-api-docs-cli");
  });

  it("uses XDG cache on Linux", () => {
    const root = resolveManagedStateRootFor({
      platform: "linux",
      env: {
        HOME: "/home/alice",
        XDG_CACHE_HOME: "/var/cache/alice",
      },
    });

    expect(root).toBe("/var/cache/alice/naver-commerce-api-docs-cli");
  });

  it("falls back to ~/.cache on Linux", () => {
    const root = resolveManagedStateRootFor({
      platform: "linux",
      env: {
        HOME: "/home/alice",
      },
    });

    expect(root).toBe("/home/alice/.cache/naver-commerce-api-docs-cli");
  });

  it("prefers nearest ancestor docs over managed or bundled docs", () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "naver-commerce-api-docs-paths-"));
    const projectRoot = path.join(tmpRoot, "project");
    const nestedRoot = path.join(projectRoot, "packages", "demo", "src");
    const docsRoot = path.join(projectRoot, "docs");
    fs.mkdirSync(path.join(docsRoot, "api"), { recursive: true });
    fs.mkdirSync(nestedRoot, { recursive: true });

    const originalCwd = process.cwd();
    try {
      process.chdir(nestedRoot);
      expect(resolveReadableDocsRoot()).toBe(docsRoot);
    } finally {
      process.chdir(originalCwd);
    }
  });

  it("ignores ancestor docs directories without a normalized corpus signature", () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "naver-commerce-api-docs-paths-"));
    const projectRoot = path.join(tmpRoot, "project");
    const nestedRoot = path.join(projectRoot, "packages", "demo", "src");
    const docsRoot = path.join(projectRoot, "docs");
    fs.mkdirSync(docsRoot, { recursive: true });
    fs.mkdirSync(nestedRoot, { recursive: true });
    fs.writeFileSync(path.join(docsRoot, "README.md"), "# unrelated docs\n", "utf-8");

    const originalCwd = process.cwd();
    try {
      process.chdir(nestedRoot);
      expect(resolveReadableDocsRoot()).not.toBe(docsRoot);
    } finally {
      process.chdir(originalCwd);
    }
  });
});
