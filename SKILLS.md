# Installer Templates

`init` installs the template sections below into agent-specific files. Keep the markers intact.

<!-- template:codex-skill:start -->
---
name: naver-commerce-api-docs-cli
description: Use this skill when working with Naver Commerce API or Smartstore API documentation, authentication, endpoint lookup, request or response fields, normalized docs, or doc quality checks. Trigger it for OAuth/token questions, endpoint lookup, doc validation, or when refreshing local docs with the CLI.
---

# naver-commerce-api-docs-cli

Use the published CLI instead of manually scanning raw documents.

## Query Workflow

- Use `npx naver-commerce-api-docs-cli ask "<question>"` for natural-language questions.
- Use `--format compact` when token budget matters and excerpt-only evidence is enough.
- Use `npx naver-commerce-api-docs-cli api --path <path> --method <METHOD> --body` for exact endpoint lookup.
- Use `npx naver-commerce-api-docs-cli api --doc-id <doc-id>` if the document id is already known.
- Add `--verbose` for step summaries and `--debug` for per-file detail.

## Validation Workflow

- Use `npx naver-commerce-api-docs-cli review` to validate links, frontmatter, and duplicate ids.
- Use `npx naver-commerce-api-docs-cli noise` to detect leftover UI noise.
- Use `npx naver-commerce-api-docs-cli lint --summary` to inspect convention warnings.

## Refresh Workflow

- The published package already ships with normalized `docs/`. Do not scrape by default.
- Refresh local docs only when the user explicitly asks for latest source sync or when upstream developer docs changed.
- Use `npx naver-commerce-api-docs-cli sync` to refresh raw source, rebuild normalized docs, and validate the result in one step.
- `sync` requires Playwright because it crawls upstream docs.

## Notes

- Read commands prefer `./docs`, then CLI managed synced cache docs, then bundled package docs.
- Managed cache defaults are cross-platform: `%LOCALAPPDATA%` on Windows, `~/Library/Caches` on macOS, and `$XDG_CACHE_HOME` or `~/.cache` on Linux under `naver-commerce-api-docs-cli`.
- Short alias `ncad` is available after install, or via `npx --package naver-commerce-api-docs-cli ncad ...`.
- `ask` is heuristic retrieval only. It returns ranked evidence and does not decide the final answer.
- Read matched file paths, doc ids, endpoint identifiers, and excerpts, then decide the final answer yourself.
- Use the final `guide` event from each command as post-processing guidance.
<!-- template:codex-skill:end -->

<!-- template:claude-skill:start -->
---
name: naver-commerce-api-docs-cli
description: Use this skill when working with Naver Commerce API or Smartstore API documentation, authentication, endpoint lookup, request or response fields, normalized docs, or doc quality checks. Trigger it for OAuth/token questions, endpoint lookup, doc validation, or when refreshing local docs with the CLI.
---

# naver-commerce-api-docs-cli

Use the published CLI instead of manually scanning raw documents.

## Query Workflow

- Use `npx naver-commerce-api-docs-cli ask "<question>"` for natural-language questions.
- Use `--format compact` when token budget matters and excerpt-only evidence is enough.
- Use `npx naver-commerce-api-docs-cli api --path <path> --method <METHOD> --body` for exact endpoint lookup.
- Use `npx naver-commerce-api-docs-cli api --doc-id <doc-id>` if the document id is already known.
- Add `--verbose` for step summaries and `--debug` for per-file detail.

## Validation Workflow

- Use `npx naver-commerce-api-docs-cli review` to validate links, frontmatter, and duplicate ids.
- Use `npx naver-commerce-api-docs-cli noise` to detect leftover UI noise.
- Use `npx naver-commerce-api-docs-cli lint --summary` to inspect convention warnings.

## Refresh Workflow

- The published package already ships with normalized `docs/`. Do not scrape by default.
- Refresh local docs only when the user explicitly asks for latest source sync or when upstream developer docs changed.
- Use `npx naver-commerce-api-docs-cli sync` to refresh raw source, rebuild normalized docs, and validate the result in one step.
- `sync` requires Playwright because it crawls upstream docs.

## Notes

- Read commands prefer `./docs`, then CLI managed synced cache docs, then bundled package docs.
- Managed cache defaults are cross-platform: `%LOCALAPPDATA%` on Windows, `~/Library/Caches` on macOS, and `$XDG_CACHE_HOME` or `~/.cache` on Linux under `naver-commerce-api-docs-cli`.
- Short alias `ncad` is available after install, or via `npx --package naver-commerce-api-docs-cli ncad ...`.
- `ask` is heuristic retrieval only. It returns ranked evidence and does not decide the final answer.
- Read matched file paths, doc ids, endpoint identifiers, and excerpts, then decide the final answer yourself.
- Use the final `guide` event from each command as post-processing guidance.
<!-- template:claude-skill:end -->

<!-- template:gemini-skill:start -->
---
name: naver-commerce-api-docs-cli
description: Use this skill when working with Naver Commerce API or Smartstore API documentation, authentication, endpoint lookup, request or response fields, normalized docs, or doc quality checks. Trigger it for OAuth/token questions, endpoint lookup, doc validation, or when refreshing local docs with the CLI.
---

# naver-commerce-api-docs-cli

Use the published CLI instead of manually scanning raw documents.

## Query Workflow

- Use `npx naver-commerce-api-docs-cli ask "<question>"` for natural-language questions.
- Use `--format compact` when token budget matters and excerpt-only evidence is enough.
- Use `npx naver-commerce-api-docs-cli api --path <path> --method <METHOD> --body` for exact endpoint lookup.
- Use `npx naver-commerce-api-docs-cli api --doc-id <doc-id>` if the document id is already known.
- Add `--verbose` for step summaries and `--debug` for per-file detail.

## Validation Workflow

- Use `npx naver-commerce-api-docs-cli review` to validate links, frontmatter, and duplicate ids.
- Use `npx naver-commerce-api-docs-cli noise` to detect leftover UI noise.
- Use `npx naver-commerce-api-docs-cli lint --summary` to inspect convention warnings.

## Refresh Workflow

- The published package already ships with normalized `docs/`. Do not scrape by default.
- Refresh local docs only when the user explicitly asks for latest source sync or when upstream developer docs changed.
- Use `npx naver-commerce-api-docs-cli sync` to refresh raw source, rebuild normalized docs, and validate the result in one step.
- `sync` requires Playwright because it crawls upstream docs.

## Notes

- Read commands prefer `./docs`, then CLI managed synced cache docs, then bundled package docs.
- Managed cache defaults are cross-platform: `%LOCALAPPDATA%` on Windows, `~/Library/Caches` on macOS, and `$XDG_CACHE_HOME` or `~/.cache` on Linux under `naver-commerce-api-docs-cli`.
- Short alias `ncad` is available after install, or via `npx --package naver-commerce-api-docs-cli ncad ...`.
- `ask` is heuristic retrieval only. It returns ranked evidence and does not decide the final answer.
- Read matched file paths, doc ids, endpoint identifiers, and excerpts, then decide the final answer yourself.
- Use the final `guide` event from each command as post-processing guidance.
<!-- template:gemini-skill:end -->

<!-- template:cursor-rule:start -->
---
description: Use naver-commerce-api-docs-cli when the task involves Naver Commerce or Smartstore API docs, OAuth/auth questions, exact endpoint lookup, or validating normalized docs.
alwaysApply: false
---

Use `npx naver-commerce-api-docs-cli ask "<question>"` for natural-language doc retrieval.
Use `--format compact` when shorter evidence is enough.
Use `npx naver-commerce-api-docs-cli api --path <path> --method <METHOD> --body` for exact endpoint lookup.
Use `npx naver-commerce-api-docs-cli review`, `noise`, or `lint --summary` before claiming docs quality.
The package already ships with normalized docs, so do not crawl by default.
Use `sync` only when the user explicitly asks to refresh local docs or the upstream docs changed.
`sync` refreshes the CLI managed cache by default, not the user's current project tree.
`ask` returns ranked evidence only. If recall looks weak, follow with exact `api` lookup or inspect the matched files.
Use the final `guide` event from each command as post-processing guidance.
<!-- template:cursor-rule:end -->

<!-- template:agents-block:start -->
## naver-commerce-api-docs-cli

Use `npx naver-commerce-api-docs-cli` for Naver Commerce or Smartstore API doc work.

- Prefer `ask "<question>"` for natural-language retrieval.
- Add `--format compact` when shorter evidence is enough.
- Use `api --path <path> --method <METHOD> --body` for exact endpoint lookup.
- Use `review`, `noise`, or `lint --summary` for validation.
- The package already ships with normalized docs; do not crawl by default.
- Use `sync` only when refreshing local docs after upstream developer docs changed.
- `sync` refreshes the CLI managed cache by default, not the current project tree.
- Treat `ask` as heuristic retrieval and decide the final answer from the returned evidence.
- Read the final `guide` event from each command for next-step instructions.
<!-- template:agents-block:end -->

<!-- template:claude-block:start -->
## naver-commerce-api-docs-cli

When Claude works with Naver Commerce or Smartstore API docs:

- Use the installed `naver-commerce-api-docs-cli` skill first.
- Use `npx naver-commerce-api-docs-cli ask "<question>"` for natural-language retrieval.
- Add `--format compact` when shorter evidence is enough.
- Use `npx naver-commerce-api-docs-cli api --path <path> --method <METHOD> --body` for exact endpoint lookup.
- Use `review`, `noise`, or `lint --summary` before claiming docs quality.
- The package already ships with normalized docs; do not crawl by default.
- Use `sync` only when latest source sync is explicitly requested or upstream developer docs changed.
- `sync` refreshes the CLI managed cache by default, not the current project tree.
- Read the final `guide` event from each command for next-step instructions.
<!-- template:claude-block:end -->

<!-- template:gemini-block:start -->
## naver-commerce-api-docs-cli

When Gemini works with Naver Commerce or Smartstore API docs:

- Use the installed `naver-commerce-api-docs-cli` skill first.
- Use `npx naver-commerce-api-docs-cli ask "<question>"` for natural-language retrieval.
- Add `--format compact` when shorter evidence is enough.
- Use `npx naver-commerce-api-docs-cli api --path <path> --method <METHOD> --body` for exact endpoint lookup.
- Use `review`, `noise`, or `lint --summary` before claiming docs quality.
- The package already ships with normalized docs; do not crawl by default.
- Use `sync` only when latest source sync is explicitly requested or upstream developer docs changed.
- `sync` refreshes the CLI managed cache by default, not the current project tree.
- Read the final `guide` event from each command for next-step instructions.
<!-- template:gemini-block:end -->
