"""HTML → Markdown 공유 변환 유틸리티.

scrape / scrape_api 양쪽에서 공통으로 사용하는 HTML→Markdown 변환 로직.
"""

from __future__ import annotations

import re

from bs4 import BeautifulSoup
from markdownify import markdownify as _md


# ── 언어 감지 ─────────────────────────────────────────────────────────────────

def detect_lang(el) -> str:
    """코드 블록의 프로그래밍 언어를 class 속성에서 감지한다."""
    cls = el.get("class") or []
    if isinstance(cls, str):
        cls = cls.split()
    for c in cls:
        m = re.match(r"language-(\S+)", c)
        if m:
            return m.group(1)
    return ""


# ── 전처리 ───────────────────────────────────────────────────────────────────

def fix_pre_br(html: str) -> str:
    """<pre> 내부의 <br> 태그를 실제 개행 문자로 교체.

    markdownify 변환 후 코드 블록 줄끝에 역슬래시가 남는 문제를 방지한다.
    """
    soup = BeautifulSoup(html, "html.parser")
    for pre in soup.find_all("pre"):
        for br in pre.find_all("br"):
            br.replace_with("\n")
    return str(soup)


# ── HTML → Markdown ───────────────────────────────────────────────────────────

def html_to_markdown(html: str) -> str:
    """HTML 문자열을 Markdown으로 변환한다.

    처리 순서:
      1. <pre> 내 <br> → 실제 개행 (코드블록 깨짐 방지)
      2. markdownify로 ATX 헤딩 / 언어 감지 변환
      3. 3개 이상 연속 빈 줄 → 2개로 축소
    """
    html = fix_pre_br(html)
    result = _md(
        html,
        heading_style="ATX",
        bullets="-",
        code_language_callback=detect_lang,
        strip=["script", "style", "nav", "aside", "header", "footer"],
    )
    result = re.sub(r"\n{3,}", "\n\n", result)
    return result.strip()


# ── URL → 파일 경로 슬러그 ───────────────────────────────────────────────────

def slugify(text: str) -> str:
    """URL 경로 세그먼트를 파일명 안전한 슬러그로 변환한다."""
    text = text.strip()
    text = re.sub(r'[/\\:*?"<>|]', "_", text)
    text = re.sub(r"\s+", "_", text)
    text = re.sub(r"_+", "_", text)
    return text.lower()
