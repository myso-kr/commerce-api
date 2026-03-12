"""Commerce API BFS 크롤러.

/docs/commerce-api/current/** 하위 모든 페이지를 BFS로 수집한다.
"""

from __future__ import annotations

import re
import time
from collections import deque
from pathlib import Path
from urllib.parse import urljoin, urlparse

from playwright.async_api import Page, BrowserContext

from scripts.core.emit import info, warn, error
from scripts.core.markdown import html_to_markdown, slugify

BASE_URL = "https://apicenter.commerce.naver.com"
CRAWL_ROOT = f"{BASE_URL}/docs/commerce-api/current"
ALLOW_PREFIX = "/docs/commerce-api/current"

# 버전 아카이브 제외 (필요시 수정)
DENY_PATTERNS = re.compile(r"/(2\.\d+\.\d+)/")

REMOVE_SELECTORS = [
    "nav", "aside", "header", "footer",
    ".sidebar", "[class*='sidebar']",
    "[class*='toc']", "[class*='breadcrumb']",
    "[class*='pagination']", "[class*='feedback']",
    "[class*='edit-link']", "script", "style",
]

CONTENT_SELECTORS = [
    "main article",
    "main .content",
    "main [class*='content']",
    "[class*='docs-content']",
    "[class*='doc-content']",
    "article",
    "main",
    "[role='main']",
]


# ── URL 유틸 ─────────────────────────────────────────────────────────────────

def url_to_filepath(url: str, output_dir: Path) -> Path:
    """URL → output_dir 하위 파일 경로."""
    parsed = urlparse(url)
    path = parsed.path
    prefix = "/docs/commerce-api/current"
    if path.startswith(prefix):
        path = path[len(prefix):]
    path = path.strip("/")
    parts = [slugify(p) for p in path.split("/") if p]
    if not parts:
        return output_dir / "index.md"
    return output_dir.joinpath(*parts[:-1]) / f"{parts[-1]}.md"


def normalize_url(href: str) -> str | None:
    """상대/절대 URL을 정규화한다. 크롤 범위 밖이면 None을 반환."""
    if not href or href.startswith("#"):
        return None
    abs_url = href if href.startswith("http") else urljoin(BASE_URL, href)
    clean = abs_url.split("?")[0].split("#")[0].rstrip("/")
    parsed = urlparse(clean)
    if parsed.netloc and parsed.netloc != urlparse(BASE_URL).netloc:
        return None
    if not parsed.path.startswith(ALLOW_PREFIX):
        return None
    if DENY_PATTERNS.search(parsed.path):
        return None
    return clean


# ── 페이지 조작 ───────────────────────────────────────────────────────────────

async def expand_sidebar(page: Page) -> None:
    """사이드바 아코디언을 모두 펼친다."""
    for _ in range(15):
        collapsed = await page.query_selector_all("[aria-expanded='false']")
        if not collapsed:
            break
        clicked = 0
        for el in collapsed:
            try:
                await el.click(timeout=300)
                clicked += 1
            except Exception:
                pass
        if clicked == 0:
            break
        await page.wait_for_timeout(300)


async def extract_content_html(page: Page) -> str:
    """메인 콘텐츠 HTML을 추출한다."""
    return await page.evaluate(f"""() => {{
        const removeSelectors = {REMOVE_SELECTORS!r};
        const contentSelectors = {CONTENT_SELECTORS!r};

        function cleanEl(el) {{
            const clone = el.cloneNode(true);
            for (const s of removeSelectors) {{
                clone.querySelectorAll(s).forEach(n => n.remove());
            }}
            return clone.innerHTML;
        }}

        for (const sel of contentSelectors) {{
            const el = document.querySelector(sel);
            if (el) {{
                const html = cleanEl(el);
                if (el.textContent.trim().length > 50) return html;
            }}
        }}

        const body = document.body.cloneNode(true);
        for (const s of removeSelectors) {{
            body.querySelectorAll(s).forEach(n => n.remove());
        }}
        return body.innerHTML;
    }}""")


async def collect_links_from_page(page: Page) -> list[str]:
    """렌더링된 페이지에서 크롤 범위 내 링크를 수집한다."""
    hrefs: list[str] = await page.evaluate("""() => {
        return Array.from(document.querySelectorAll('a[href]'))
            .map(a => a.getAttribute('href'))
            .filter(h => h && !h.startsWith('#'));
    }""")
    result = []
    for href in hrefs:
        norm = normalize_url(href)
        if norm:
            result.append(norm)
    return result


# ── BFS 크롤 ─────────────────────────────────────────────────────────────────

async def crawl(context: BrowserContext, output_dir: Path) -> tuple[int, int]:
    """BFS로 commerce-api 문서를 전체 수집한다.

    Returns:
        (saved, errors) 카운트 튜플
    """
    output_dir.mkdir(parents=True, exist_ok=True)

    visited: set[str] = set()
    queue: deque[str] = deque([CRAWL_ROOT])
    errors_list: list[dict] = []
    saved = 0

    page = await context.new_page()

    info("crawl_start", url=CRAWL_ROOT, out=str(output_dir))
    await page.goto(CRAWL_ROOT, wait_until="networkidle", timeout=30000)
    await page.wait_for_timeout(2500)
    await expand_sidebar(page)
    await page.wait_for_timeout(600)

    seed_links = await collect_links_from_page(page)
    for link in seed_links:
        if link not in visited:
            queue.append(link)
    info("seed_links", count=len(seed_links))

    while queue:
        url = queue.popleft()
        if url in visited:
            continue
        visited.add(url)

        idx = saved + len(errors_list) + 1
        try:
            await page.goto(url, wait_until="networkidle", timeout=30000)
            await page.wait_for_timeout(1000)

            title: str = await page.evaluate(
                "() => document.querySelector('h1')?.textContent?.trim() || document.title"
            )

            html = await extract_content_html(page)
            body = html_to_markdown(html)

            if not body or len(body) < 30:
                warn("skip", idx=idx, url=url, msg="내용 없음")
                continue

            markdown = f"# {title}\n\n> 원문: {url}\n\n{body}\n"

            file_path = url_to_filepath(url, output_dir)
            file_path.parent.mkdir(parents=True, exist_ok=True)
            file_path.write_text(markdown, encoding="utf-8")

            try:
                rel = str(file_path.relative_to(output_dir.parent.parent))
            except ValueError:
                rel = str(file_path)

            info("page", idx=idx, url=url, file=rel,
                 chars=len(body), ok=True)
            saved += 1

            new_links = await collect_links_from_page(page)
            added = 0
            for link in new_links:
                if link not in visited and link not in queue:
                    queue.append(link)
                    added += 1
            if added:
                info("new_links", idx=idx, added=added, queue=len(queue))

        except Exception as e:
            err_msg = str(e)
            error("page", idx=idx, url=url, msg=err_msg, ok=False)
            errors_list.append({"url": url, "error": err_msg})

        await page.wait_for_timeout(600)

    # 인덱스 저장
    all_md_files = sorted(output_dir.rglob("*.md"))
    index_lines = [
        "# Commerce API - 전체 페이지 목록",
        "",
        f"수집일: {time.strftime('%Y-%m-%dT%H:%M:%S')}",
        f"총 {saved}개 페이지",
        "",
    ]
    for f in all_md_files:
        rel = f.relative_to(output_dir)
        index_lines.append(f"- [{rel}](./{rel.as_posix()})")
    (output_dir / "_index.md").write_text("\n".join(index_lines), encoding="utf-8")

    if errors_list:
        error_lines = ["# 오류 목록", ""]
        for e in errors_list:
            error_lines.append(f"- {e['url']}: {e['error']}")
        (output_dir / "_errors.md").write_text("\n".join(error_lines), encoding="utf-8")

    return saved, len(errors_list)
