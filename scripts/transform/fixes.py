"""콘텐츠 정리 및 변환 함수 모음.

원본 크롤링 데이터에서 Docusaurus 아티팩트, UI 잔재, 노이즈를
제거하거나 Markdown 표준 형식으로 변환한다.
"""

from __future__ import annotations

import re


# ── 노이즈 제거 ───────────────────────────────────────────────────────────────

def remove_source_line(content: str) -> str:
    """'> 원문: URL' 줄을 제거한다 (frontmatter source 필드로 이동)."""
    return re.sub(r"^> 원문: https?://\S+\s*\n?", "", content, flags=re.MULTILINE)


def dedup_h1(content: str) -> str:
    """첫 번째 H1만 유지하고 이후 H1을 제거한다."""
    matches = list(re.finditer(r"^# .+$", content, re.MULTILINE))
    if len(matches) <= 1:
        return content
    first_end = matches[0].end()
    head = content[:first_end]
    tail = content[first_end:]
    tail = re.sub(r"^# .+\n?", "", tail, flags=re.MULTILINE)
    return head + tail


def remove_direct_links(content: str) -> str:
    """Docusaurus 앵커 노이즈를 제거한다.

    예: [​](#xxx "Direct link to xxx"), [#](#xxx "Direct link to xxx")
    """
    content = re.sub(r"\[\u200b\]\(#[^)]+\)", "", content)
    content = re.sub(r'\[​\]\(#[^)]+\)', "", content)
    content = re.sub(r'\[#\]\(#[^"]+?"Direct link to[^"]*"\)', "", content)
    content = re.sub(r'\[\u200b\]\(#[^"]+?"[^"]*"\)', "", content)
    content = re.sub(r'\[​\]\(#[^"]+?"[^"]*"\)', "", content)
    content = re.sub(r'\[​?\]\(#\S+(?:\s+"[^"]*")?\)', "", content)
    return content


def remove_ui_tabs(content: str) -> str:
    """언어 탭 목록 및 Schema/Example 탭 레이블을 제거한다."""
    content = re.sub(
        r"^- (curl|java|python|php|nodejs|csharp|kotlin|javascript|ruby|go|C#|Kotlin)\s*$",
        "",
        content,
        flags=re.MULTILINE | re.IGNORECASE,
    )
    content = re.sub(
        r"^- (Schema|Example \(auto\)|CURL|Example)\s*$",
        "",
        content,
        flags=re.MULTILINE,
    )
    return content


def remove_application_type_lines(content: str) -> str:
    """'- application/json' 같은 독립 미디어 타입 줄을 제거한다."""
    return re.sub(r"^- application/[^\n]+\s*\n", "", content, flags=re.MULTILINE)


def remove_status_code_list(content: str) -> str:
    """'- 200 / - 400 / - 403' 같은 HTTP 상태코드 나열 블록을 제거한다."""
    return re.sub(r"(?:^- \d{3}\s*\n){2,}", "", content, flags=re.MULTILINE)


def remove_schema_labels(content: str) -> str:
    """독립 **Schema** 레이블 줄을 제거한다."""
    return re.sub(r"^\*\*Schema\*\*\s*\n", "", content, flags=re.MULTILINE)


def remove_web_ui_widget(content: str) -> str:
    """Redoc 인터랙티브 위젯 블록('Request Collapse all'부터 끝까지)을 제거한다."""
    return re.sub(
        r"\n+Request Collapse all\n.*$",
        "",
        content,
        flags=re.DOTALL,
    )


def remove_auth_boilerplate(content: str) -> str:
    """반복되는 '#### Authorization: oauth2' 보일러플레이트 섹션을 제거한다."""
    return re.sub(
        r"^#### Authorization: oauth2\s*\n(?:(?!\n##|\n#).*\n)*",
        "",
        content,
        flags=re.MULTILINE,
    )


def remove_array_notation(content: str) -> str:
    """'- Array [' 및 '- ]' 줄을 제거한다 (내부 콘텐츠는 유지)."""
    content = re.sub(r"^- Array \[\s*\n", "", content, flags=re.MULTILINE)
    content = re.sub(r"^- \]\s*\n", "", content, flags=re.MULTILINE)
    return content


# ── HTTP 메서드 블록 변환 ─────────────────────────────────────────────────────

def convert_method_block(
    content: str,
    method: str,
    api_path: str,
    base_url: str,
    raw_path: str = "",
) -> str:
    """펜스드 코드 메서드 블록을 인라인 블록쿼트로 변환한다.

    Before:
        ```
        GET

        ## /v1/oauth2/token
        ```

    After:
        > **GET** `https://api.commerce.naver.com/external/v1/oauth2/token`
    """
    if not method or not api_path:
        return content
    full_url = f"{base_url}{api_path}"
    replacement = f"> **{method}** `{full_url}`"
    match_path = raw_path if raw_path else api_path
    pattern = (
        r"```\s*\n"
        + re.escape(method)
        + r"\s*\n\n## "
        + re.escape(match_path)
        + r"\s*\n```"
    )
    return re.sub(pattern, replacement, content)


def add_h2_context(content: str, method: str, api_path: str) -> str:
    """## Request / ## Responses 아래에 METHOD /path 컨텍스트를 추가한다."""
    if not method or not api_path:
        return content

    def replace_request(m: re.Match) -> str:
        return f"## Request\n\n**{method}** `{api_path}`"

    def replace_responses(m: re.Match) -> str:
        return f"## Responses\n\n**{method}** `{api_path}` — 응답"

    content = re.sub(r"^## Request\s*$", replace_request, content, flags=re.MULTILINE)
    content = re.sub(r"^## Responses\s*$", replace_responses, content, flags=re.MULTILINE)
    return content


# ── 이스케이프 수정 ───────────────────────────────────────────────────────────

def fix_escaped_underscores(content: str) -> str:
    r"""\\_ → _ 로 변환 (펜스드 코드블록 내부 제외)."""

    def fix_bold(m: re.Match) -> str:
        return "**" + m.group(1).replace("\\_", "_") + "**"

    def fix_code(m: re.Match) -> str:
        return "`" + m.group(1).replace("\\_", "_") + "`"

    content = re.sub(r"\*\*([^*]+)\*\*", fix_bold, content)
    content = re.sub(r"`([^`\n]+)`", fix_code, content)

    lines = content.split("\n")
    in_fence = False
    result = []
    for line in lines:
        if line.strip().startswith("```"):
            in_fence = not in_fence
        if not in_fence:
            line = line.replace("\\_", "_")
        result.append(line)
    return "\n".join(result)


# ── 코드블록 정리 ─────────────────────────────────────────────────────────────

def infer_code_language(block: str) -> str:
    """언어 식별자 없는 코드 블록의 언어를 추론한다."""
    s = block.strip()
    if re.match(r"^\s*[\[{]", s):
        return "json"
    if re.match(r"^curl\s", s):
        return "bash"
    if re.match(r"^#!/", s):
        return "bash"
    if re.match(r"^(?:GET|POST|PUT|DELETE|PATCH)\s+/", s):
        return "http"
    return ""


def fix_bare_code_blocks(content: str) -> str:
    """언어 식별자 없는 코드 블록을 처리한다.

    - 언어를 추론할 수 있으면 식별자 추가
    - 빈 블록 제거
    - 한국어 텍스트 등 비코드 콘텐츠는 언래핑
    """

    def replace_fence(m: re.Match) -> str:
        block_content = m.group(1)
        s = block_content.strip()

        if not s:
            return ""

        lang = infer_code_language(block_content)
        if lang:
            return f"```{lang}\n{block_content}```"

        if re.search(r"[가-힣]", s):
            return s + "\n"
        if re.match(
            r"^(?:Bad [Rr]equest|Unauthorized|Forbidden|Not [Ff]ound"
            r"|Internal Server Error|Method Not Allowed"
            r"|Not Acceptable|Unsupported)",
            s,
        ):
            return s + "\n"

        return m.group(0)

    return re.sub(
        r"^```[ \t]*\n([\s\S]*?)^```[ \t]*\n?",
        replace_fence,
        content,
        flags=re.MULTILINE,
    )


# ── 중복 / 공백 정리 ──────────────────────────────────────────────────────────

def dedup_repeated_paragraphs(content: str) -> str:
    """50자 초과 중복 단락을 제거한다 (첫 번째 등장 유지)."""
    paras = content.split("\n\n")
    seen: set[str] = set()
    result = []
    for para in paras:
        stripped = para.strip()
        if len(stripped) > 50:
            if stripped in seen:
                continue
            seen.add(stripped)
        result.append(para)
    return "\n\n".join(result)


def clean_blank_lines(content: str) -> str:
    """3개 이상 연속 빈 줄을 2개로 줄이고 앞뒤 공백을 정리한다."""
    content = re.sub(r"\n{4,}", "\n\n\n", content)
    return content.strip() + "\n"
