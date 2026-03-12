"""CONVENTION.md 규칙 기반 린트 체크 함수 모음.

검사 코드:
  F1  frontmatter 필수 필드 누락 (doc-id, title, description, type, source)
  F2  api-endpoint 전용 필드 누락 (method, path, base-url)
  F3  description == title (추출 실패)
  F4  tags 비어 있음
  F5  entities 필드 없음 (api-endpoint, schema)

  S1  H1 제목 중복 (두 개 이상)
  S2  method code block 미변환 (``` POST / GET ... ``` 잔존)
  S3  ## Request 뒤 METHOD /path 컨텍스트 누락
  S4  > 원문: 줄 잔존
  S5  Direct link to 앵커 잔존

  N1  UI 탭 목록 잔존 (- curl, - java 등)
  N2  Request Collapse all 잔존
  N3  #### Authorization: oauth2 보일러플레이트 잔존
  N4  - Array [ / - ] 표기법 잔존
  N5  이스케이프 언더스코어 (\\_) 잔존 (본문 bold/code 외)
  N6  Docusaurus 내부 링크 (/docs/...) 잔존

  B1  언어 식별자 없는 코드블록 (``` 단독)
  B2  동일 스키마 반복 응답코드 (400+403+500 각각 별도 섹션)

  C1  카테고리 인덱스에 테이블 형식 없음 (원본 링크 카드 형식 잔존)

  D1  단락 중복 (50자 이상 동일 단락이 두 번 이상)
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

from scripts.core.paths import DST_DOCS

LEVEL_ERROR = "ERROR"
LEVEL_WARN = "WARN"
LEVEL_INFO = "INFO"

REQUIRED_FM_FIELDS = ["doc-id", "title", "description", "type", "source"]
API_EXTRA_FIELDS = ["method", "path", "base-url"]

TAGS_VOCAB = {
    "auth", "product", "order", "settle", "inquiry", "logistics",
    "stats", "commerce-solution", "seller",
    "oauth2", "token", "schema", "category", "option", "delivery",
    "image", "cancel", "exchange", "return", "dispatch",
    "getting-started", "reference", "guide", "deprecated", "beta",
    "get", "post", "put", "delete", "patch",
}


@dataclass
class Issue:
    code: str
    level: str
    file: str
    message: str

    def __str__(self) -> str:
        return f"[{self.level}] {self.code}  {self.file}\n         {self.message}"


# ── 파싱 헬퍼 ────────────────────────────────────────────────────────────────

def parse_frontmatter(content: str) -> dict:
    """YAML frontmatter를 key→value dict로 단순 파싱한다."""
    fm: dict = {}
    stripped = content.lstrip()
    if not stripped.startswith("---"):
        return fm
    end = stripped.find("\n---\n", 3)
    if end == -1:
        return fm
    block = stripped[3:end]
    for line in block.splitlines():
        m = re.match(r"^([a-zA-Z_-]+):\s*(.*)", line)
        if m:
            fm[m.group(1)] = m.group(2).strip().strip('"')
    # tags 목록
    tags = re.findall(r"^\s+- (.+)$", block, re.MULTILINE)
    if tags:
        fm["_tags"] = [t.strip() for t in tags]
    return fm


def body_only(content: str) -> str:
    """frontmatter를 제거하고 본문만 반환한다."""
    stripped = content.lstrip()
    if not stripped.startswith("---"):
        return content
    end = stripped.find("\n---\n", 3)
    if end == -1:
        return content
    return stripped[end + 5:]


def strip_bold_code(text: str) -> str:
    """bold(**...**), inline code(`...`) 제거."""
    text = re.sub(r"\*\*[^*\n]+\*\*", "", text)
    text = re.sub(r"`[^`\n]+`", "", text)
    return text


# ── 메인 린트 함수 ───────────────────────────────────────────────────────────

def lint_file(path: Path, *, dst: Path | None = None) -> list[Issue]:
    """단일 Markdown 파일을 모든 규칙에 대해 검사한다.

    Args:
        path: 검사할 파일 경로
        dst:  문서 루트 디렉터리 (상대 경로 표시용, 기본값: DST_DOCS)

    Returns:
        발견된 Issue 목록
    """
    _dst = dst or DST_DOCS
    issues: list[Issue] = []

    try:
        rel = str(path.relative_to(_dst))
    except ValueError:
        rel = str(path)

    content = path.read_text(encoding="utf-8")
    fm = parse_frontmatter(content)
    body = body_only(content)
    page_type = fm.get("type", "")

    # ── F: Frontmatter ───────────────────────────────────────────────────────

    skip_source = (page_type == "guide")
    for fld in REQUIRED_FM_FIELDS:
        if skip_source and fld == "source":
            continue
        if fld not in fm or not fm[fld]:
            issues.append(Issue("F1", LEVEL_ERROR, rel,
                                f"frontmatter 필수 필드 누락: {fld}"))

    if page_type == "api-endpoint":
        for fld in API_EXTRA_FIELDS:
            if fld not in fm or not fm[fld]:
                issues.append(Issue("F2", LEVEL_ERROR, rel,
                                    f"api-endpoint 전용 필드 누락: {fld}"))

    if (fm.get("title") and fm.get("description")
            and fm["title"] == fm["description"]):
        issues.append(Issue("F3", LEVEL_WARN, rel,
                            "description이 title과 동일 (설명 추출 실패로 추정)"))

    if not fm.get("_tags"):
        issues.append(Issue("F4", LEVEL_WARN, rel, "tags가 비어 있음"))

    if page_type in ("api-endpoint", "schema") and "entities:" not in content:
        issues.append(Issue("F5", LEVEL_INFO, rel,
                            "entities 필드 없음 (검색 리콜 향상에 권장)"))

    # ── S: 구조 ──────────────────────────────────────────────────────────────

    h1_matches = re.findall(r"^# .+$", body, re.MULTILINE)
    if len(h1_matches) > 1:
        issues.append(Issue("S1", LEVEL_ERROR, rel,
                            f"H1 제목 중복: {len(h1_matches)}개"))

    if re.search(r"^```\s*\n(?:GET|POST|PUT|DELETE|PATCH)\s*\n", body, re.MULTILINE):
        issues.append(Issue("S2", LEVEL_ERROR, rel,
                            "HTTP 메서드 코드블록 미변환 (``` METHOD 패턴 잔존)"))

    if page_type == "api-endpoint":
        if "## Request" in body and not re.search(r"## Request\n\n\*\*[A-Z]+\*\*", body):
            issues.append(Issue("S3", LEVEL_WARN, rel,
                                "## Request 뒤 METHOD /path 컨텍스트 누락"))

    if re.search(r"^> 원문:", body, re.MULTILINE):
        issues.append(Issue("S4", LEVEL_ERROR, rel,
                            "> 원문: 줄 잔존 (frontmatter source로 이동해야 함)"))

    if re.search(r"Direct link to", body):
        issues.append(Issue("S5", LEVEL_ERROR, rel,
                            '"Direct link to" 앵커 잔존'))

    # ── N: 노이즈 ─────────────────────────────────────────────────────────────

    if re.search(r"^- (?:curl|java|python|php|nodejs)\s*$",
                 body, re.MULTILINE | re.IGNORECASE):
        issues.append(Issue("N1", LEVEL_ERROR, rel,
                            "UI 탭 목록 잔존 (- curl, - java 등)"))

    if "Request Collapse all" in body:
        issues.append(Issue("N2", LEVEL_ERROR, rel,
                            "웹 UI 잔재 잔존 (Request Collapse all)"))

    if re.search(r"^#### Authorization: oauth2", body, re.MULTILINE):
        issues.append(Issue("N3", LEVEL_WARN, rel,
                            "인증 보일러플레이트 잔존"))

    if (re.search(r"^- Array \[", body, re.MULTILINE)
            or re.search(r"^- \]\s*$", body, re.MULTILINE)):
        issues.append(Issue("N4", LEVEL_WARN, rel,
                            "- Array [ / - ] 표기법 잔존"))

    plain = strip_bold_code(
        re.sub(r"^---.*?^---\s*", "", content, flags=re.DOTALL | re.MULTILINE)
    )
    if "\\_" in plain:
        cnt = plain.count("\\_")
        issues.append(Issue("N5", LEVEL_WARN, rel,
                            f"이스케이프 언더스코어 잔존: {cnt}개 (\\_)"))

    if re.search(r"\]\(/docs/", body):
        issues.append(Issue("N6", LEVEL_WARN, rel,
                            "Docusaurus 내부 링크 잔존 (]/docs/...) — 상대경로로 수정 필요"))

    # ── B: 코드블록 ───────────────────────────────────────────────────────────

    bare_count = 0
    in_fence = False
    for line in body.split("\n"):
        if in_fence:
            if re.match(r"^```\s*$", line):
                in_fence = False
        else:
            m = re.match(r"^```(\S*)\s*$", line)
            if m:
                if not m.group(1):
                    bare_count += 1
                in_fence = True
    if bare_count:
        issues.append(Issue("B1", LEVEL_WARN, rel,
                            f"언어 식별자 없는 코드블록 {bare_count}개 (```만 있는 줄)"))

    if page_type == "api-endpoint":
        has_400 = bool(re.search(r"(?:^|\n)(#+.*(?:400|Bad Request))", body))
        has_403 = bool(re.search(r"(?:^|\n)(#+.*(?:403|Forbidden))", body))
        has_500 = bool(re.search(r"(?:^|\n)(#+.*(?:500|Internal))", body))
        if has_400 and has_403 and has_500:
            issues.append(Issue("B2", LEVEL_INFO, rel,
                                "400/403/500이 각각 별도 섹션 (동일 스키마면 단일 섹션으로 통합 권장)"))

    # ── C: 카테고리 인덱스 ────────────────────────────────────────────────────

    if page_type == "category-index":
        if not re.search(r"^\|.+\|", body, re.MULTILINE):
            issues.append(Issue("C1", LEVEL_WARN, rel,
                                "카테고리 인덱스에 테이블 형식 없음 (원본 링크 카드 형식 잔존)"))

    # ── D: 콘텐츠 품질 ────────────────────────────────────────────────────────

    paras = [p.strip() for p in body.split("\n\n") if len(p.strip()) > 50]
    seen_paras: set[str] = set()
    dup_count = 0
    for p in paras:
        if p in seen_paras:
            dup_count += 1
        seen_paras.add(p)
    if dup_count:
        issues.append(Issue("D1", LEVEL_WARN, rel,
                            f"중복 단락 {dup_count}개 (동일 텍스트 반복)"))

    return issues
