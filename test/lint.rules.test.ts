import { describe, expect, it } from "vitest";
import { bodyOnly, parseFrontmatter } from "../src/lint/rules.js";

describe("lint rules frontmatter parsing", () => {
  it("parses CRLF frontmatter correctly", () => {
    const content = [
      "---",
      'doc-id: "v1-oauth2-token-post"',
      'title: "인증 토큰 발급 요청"',
      'description: "설명"',
      "type: api-endpoint",
      "source: https://example.com/doc",
      "tags:",
      "  - auth",
      "  - oauth2",
      "---",
      "",
      "# 인증 토큰 발급 요청",
    ].join("\r\n");

    const fm = parseFrontmatter(content);
    const body = bodyOnly(content);

    expect(fm["doc-id"]).toBe("v1-oauth2-token-post");
    expect(fm["title"]).toBe("인증 토큰 발급 요청");
    expect(fm["description"]).toBe("설명");
    expect(fm["type"]).toBe("api-endpoint");
    expect(fm["source"]).toBe("https://example.com/doc");
    expect(fm["_tags"]).toBe("auth,oauth2");
    expect(body).toContain("# 인증 토큰 발급 요청");
  });
});
