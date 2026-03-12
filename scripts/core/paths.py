"""공유 경로 상수.

프로젝트 루트를 기준으로 모든 주요 디렉터리 경로를 정의한다.
"""

from pathlib import Path

# 프로젝트 루트: scripts/ 의 부모
ROOT = Path(__file__).parent.parent.parent

# 크롤링 원본 소스 (raws/commerce-api/current/)
SRC_RAWS = ROOT / "raws" / "commerce-api" / "current"

# 변환된 문서 출력 디렉터리
DST_DOCS = ROOT / "docs"

# 변환 출력 하위 디렉터리
DST_API      = DST_DOCS / "api"
DST_SCHEMA   = DST_DOCS / "schema"
DST_CATEGORY = DST_DOCS / "category"
DST_GUIDE    = DST_DOCS / "guide"

# lint / review / noise 대상 디렉터리 목록
OUTPUT_DIRS = [DST_API, DST_SCHEMA, DST_CATEGORY, DST_GUIDE]
