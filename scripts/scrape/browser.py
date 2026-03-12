"""Playwright 기반 브라우저 유틸리티.

scrape 및 scrape_api 양쪽에서 공유하는 페이지 조작 헬퍼.
"""

from __future__ import annotations

import time
from pathlib import Path
from urllib.parse import urljoin, urlparse

from playwright.async_api import Page

from scripts.core.markdown import html_to_markdown

BASE_URL = "https://apicenter.commerce.naver.com"

CONTENT_SELECTORS = [
    "main article",
    "main .content",
    "main [class*='content']",
    "[class*='docs-content']",
    "[class*='doc-content']",
    "[class*='article']",
    "article",
    "main",
    "[role='main']",
]

REMOVE_SELECTORS = [
    "nav",
    "aside",
    "header",
    "footer",
    ".sidebar",
    "[class*='sidebar']",
    "[class*='toc']",
    "[class*='breadcrumb']",
    "[class*='pagination']",
    "[class*='feedback']",
    "[class*='edit-link']",
    "script",
    "style",
]


# ── 네비게이션 ────────────────────────────────────────────────────────────────

async def expand_all_nav(page: Page) -> None:
    """사이드바 아코디언/토글을 모두 펼친다.

    aria-expanded=false 인 버튼을 반복 클릭한다.
    """
    for _ in range(10):
        collapsed = await page.query_selector_all(
            "[aria-expanded='false'], "
            "[class*='arrow']:not([class*='open']):not([class*='active']), "
            "[class*='toggle']:not([class*='open']):not([class*='active'])"
        )
        if not collapsed:
            break
        for el in collapsed:
            try:
                await el.click(timeout=500)
            except Exception:
                pass
        await page.wait_for_timeout(400)


async def collect_nav_links(page: Page) -> list[dict]:
    """렌더링 완료 후 사이드바에서 /docs 경로의 모든 링크를 수집한다.

    Returns:
        [{"url": abs_url, "title": text}, ...] (중복 제거, 절대 URL)
    """
    await page.wait_for_load_state("networkidle")
    await page.wait_for_timeout(2000)
    await expand_all_nav(page)
    await page.wait_for_timeout(800)

    links: list[dict] = await page.evaluate("""() => {
        const result = [];
        const seen = new Set();

        const primarySelectors = [
            'nav a[href*="/docs"]',
            '.sidebar a[href*="/docs"]',
            '[class*="sidebar"] a[href*="/docs"]',
            '[class*="nav"] a[href*="/docs"]',
            '[class*="menu"] a[href*="/docs"]',
            '[class*="tree"] a[href*="/docs"]',
            '[class*="toc"] a[href*="/docs"]',
        ];

        for (const sel of primarySelectors) {
            document.querySelectorAll(sel).forEach(el => {
                const href = el.getAttribute('href') || '';
                const text = el.textContent.trim();
                if (href && text && !seen.has(href)) {
                    seen.add(href);
                    result.push({ href, text });
                }
            });
        }

        if (result.length === 0) {
            document.querySelectorAll('a[href*="/docs"]').forEach(el => {
                const href = el.getAttribute('href') || '';
                const text = el.textContent.trim();
                if (href && text && !seen.has(href)) {
                    seen.add(href);
                    result.push({ href, text });
                }
            });
        }

        return result;
    }""")

    seen_urls: set[str] = set()
    result: list[dict] = []
    for item in links:
        href: str = item["href"]
        title: str = item["text"]
        if href.startswith("#"):
            continue
        abs_url = href if href.startswith("http") else urljoin(BASE_URL, href)
        clean_url = abs_url.split("?")[0].split("#")[0]
        if clean_url not in seen_urls and "/docs" in clean_url:
            seen_urls.add(clean_url)
            result.append({"url": clean_url, "title": title})

    return result


# ── 콘텐츠 추출 ───────────────────────────────────────────────────────────────

async def extract_content_html(page: Page) -> str:
    """메인 콘텐츠 HTML을 추출한다 (사이드바·네비 제거 후)."""
    html: str = await page.evaluate(f"""() => {{
        const contentSelectors = {CONTENT_SELECTORS!r};
        const removeSelectors = {REMOVE_SELECTORS!r};

        function cleanAndReturn(el) {{
            const clone = el.cloneNode(true);
            for (const sel of removeSelectors) {{
                clone.querySelectorAll(sel).forEach(n => n.remove());
            }}
            const text = clone.textContent.trim();
            if (text.length > 100) return clone.innerHTML;
            return null;
        }}

        for (const sel of contentSelectors) {{
            const el = document.querySelector(sel);
            if (el) {{
                const result = cleanAndReturn(el);
                if (result) return result;
            }}
        }}

        const body = document.body.cloneNode(true);
        for (const sel of removeSelectors) {{
            body.querySelectorAll(sel).forEach(n => n.remove());
        }}
        return body.innerHTML;
    }}""")
    return html


async def page_to_markdown(page: Page, url: str, title: str) -> str:
    """URL 페이지를 Markdown 문자열로 반환한다."""
    await page.goto(url, wait_until="networkidle", timeout=30000)
    await page.wait_for_timeout(1500)

    html = await extract_content_html(page)
    body = html_to_markdown(html)

    return f"# {title}\n\n> 원문: {url}\n\n{body}\n"


# ── URL → 파일 경로 ───────────────────────────────────────────────────────────

def url_to_filepath(url: str, output_dir: Path) -> Path:
    """URL을 output_dir 하위 파일 경로로 변환한다."""
    from scripts.core.markdown import slugify
    parsed = urlparse(url)
    path = parsed.path.lstrip("/")
    if path.startswith("docs/"):
        path = path[len("docs/"):]
    parts = [slugify(p) for p in path.split("/") if p]
    if not parts:
        parts = ["introduction"]
    return output_dir.joinpath(*parts[:-1]) / f"{parts[-1]}.md"
