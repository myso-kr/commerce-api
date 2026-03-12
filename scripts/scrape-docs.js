/**
 * Naver Commerce API Center - 문서 스크래퍼
 *
 * 사용법:
 *   node scrape-docs.js
 *
 * 필요 패키지:
 *   npm install playwright turndown
 *   npx playwright install chromium
 */

const { chromium } = require('playwright');
const TurndownService = require('turndown');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://apicenter.commerce.naver.com';
const OUTPUT_DIR = path.join(__dirname, 'docs');

// Turndown 설정 (HTML → Markdown 변환)
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

// 코드 블록 처리 규칙 추가
turndown.addRule('codeBlock', {
  filter: ['pre'],
  replacement(content, node) {
    const code = node.querySelector('code');
    const lang = code
      ? (code.className.match(/language-(\S+)/) || [])[1] || ''
      : '';
    const text = node.textContent || '';
    return `\n\`\`\`${lang}\n${text.trim()}\n\`\`\`\n`;
  },
});

// 테이블 처리 규칙
turndown.keep(['table', 'thead', 'tbody', 'tr', 'th', 'td']);

/**
 * 폴더 생성 (재귀)
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * 파일명으로 쓸 수 있는 슬러그 생성
 */
function slugify(str) {
  return str
    .trim()
    .replace(/[\/\\:*?"<>|]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase();
}

/**
 * 네비게이션 메뉴에서 모든 링크 수집
 */
async function collectNavLinks(page) {
  console.log('📂 네비게이션 링크 수집 중...');

  // 페이지가 완전히 로드될 때까지 대기
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  const links = await page.evaluate(() => {
    const result = [];
    const seen = new Set();

    // 사이드바/네비게이션 영역의 모든 a 태그 수집
    const selectors = [
      'nav a[href*="/docs"]',
      '.sidebar a[href*="/docs"]',
      '.nav a[href*="/docs"]',
      '.menu a[href*="/docs"]',
      '[class*="sidebar"] a[href*="/docs"]',
      '[class*="nav"] a[href*="/docs"]',
      '[class*="menu"] a[href*="/docs"]',
    ];

    for (const selector of selectors) {
      try {
        document.querySelectorAll(selector).forEach(el => {
          const href = el.getAttribute('href');
          const text = el.textContent.trim();
          if (href && text && !seen.has(href)) {
            seen.add(href);
            result.push({ href, text });
          }
        });
      } catch (e) {}
    }

    // 수집이 없으면 전체 a 태그에서 /docs 포함된 링크 수집
    if (result.length === 0) {
      document.querySelectorAll('a[href*="/docs"]').forEach(el => {
        const href = el.getAttribute('href');
        const text = el.textContent.trim();
        if (href && text && !seen.has(href)) {
          seen.add(href);
          result.push({ href, text });
        }
      });
    }

    return result;
  });

  // 절대 URL로 변환 & 중복 제거
  const absoluteLinks = [];
  const seenHrefs = new Set();
  for (const { href, text } of links) {
    const absolute = href.startsWith('http') ? href : `${BASE_URL}${href}`;
    if (!seenHrefs.has(absolute)) {
      seenHrefs.add(absolute);
      absoluteLinks.push({ url: absolute, title: text });
    }
  }

  console.log(`✅ ${absoluteLinks.length}개 링크 발견`);
  return absoluteLinks;
}

/**
 * 페이지 콘텐츠를 마크다운으로 변환
 */
async function pageToMarkdown(page, url, title) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);

  // 펼쳐진 상태의 콘텐츠 영역 찾기
  const html = await page.evaluate(() => {
    // 본문 콘텐츠 영역 후보 셀렉터들
    const contentSelectors = [
      'main article',
      'main .content',
      'main [class*="content"]',
      '.docs-content',
      '[class*="docs-content"]',
      'article',
      'main',
      '[role="main"]',
    ];

    for (const sel of contentSelectors) {
      const el = document.querySelector(sel);
      if (el) {
        // 네비게이션/사이드바 등 불필요 요소 제거
        const clone = el.cloneNode(true);
        ['nav', 'aside', '.sidebar', '[class*="sidebar"]', '[class*="toc"]'].forEach(s => {
          clone.querySelectorAll(s).forEach(n => n.remove());
        });
        const text = clone.textContent.trim();
        if (text.length > 100) return clone.innerHTML;
      }
    }

    // 폴백: body 전체
    const body = document.body.cloneNode(true);
    ['nav', 'aside', 'header', 'footer', '.sidebar'].forEach(s => {
      body.querySelectorAll(s).forEach(n => n.remove());
    });
    return body.innerHTML;
  });

  const markdown = turndown.turndown(html);
  return `# ${title}\n\n> 원문: ${url}\n\n${markdown}`;
}

/**
 * 메인 실행 함수
 */
async function main() {
  ensureDir(OUTPUT_DIR);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  try {
    // 시작 페이지 이동
    console.log('🚀 시작 페이지 로딩...');
    await page.goto(`${BASE_URL}/docs/introduction`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    await page.waitForTimeout(3000);

    // 사이드바 모든 항목 펼치기 시도
    await page.evaluate(() => {
      document.querySelectorAll('[class*="arrow"], [class*="toggle"], [class*="expand"], [class*="collapse"]').forEach(el => {
        try { el.click(); } catch(e) {}
      });
    });
    await page.waitForTimeout(1000);

    // 링크 수집
    const links = await collectNavLinks(page);

    if (links.length === 0) {
      console.log('⚠️  링크를 찾지 못했습니다. 페이지 구조를 확인합니다...');
      // 현재 페이지 HTML 덤프
      const html = await page.content();
      fs.writeFileSync(path.join(OUTPUT_DIR, '__debug_page.html'), html, 'utf8');
      console.log('   __debug_page.html 파일에 현재 페이지 HTML을 저장했습니다.');
      await browser.close();
      return;
    }

    // 링크 목록 저장
    const linkList = links.map(l => `- [${l.title}](${l.url})`).join('\n');
    fs.writeFileSync(
      path.join(OUTPUT_DIR, '_index.md'),
      `# Naver Commerce API Center - 문서 목록\n\n수집일: ${new Date().toISOString()}\n\n${linkList}\n`,
      'utf8'
    );
    console.log(`📄 _index.md 저장 완료`);

    // 각 페이지 변환
    console.log('\n📥 각 페이지 변환 시작...\n');
    const errors = [];

    for (let i = 0; i < links.length; i++) {
      const { url, title } = links[i];
      const progress = `[${i + 1}/${links.length}]`;

      try {
        console.log(`${progress} ${title} - ${url}`);

        const markdown = await pageToMarkdown(page, url, title);

        // URL 경로를 기반으로 파일 경로 생성
        const urlPath = url.replace(BASE_URL, '').replace(/^\/docs\/?/, '');
        const parts = urlPath.split('/').filter(Boolean);

        let filePath;
        if (parts.length === 0) {
          filePath = path.join(OUTPUT_DIR, 'introduction.md');
        } else if (parts.length === 1) {
          filePath = path.join(OUTPUT_DIR, `${slugify(parts[0])}.md`);
        } else {
          const dir = path.join(OUTPUT_DIR, ...parts.slice(0, -1).map(slugify));
          ensureDir(dir);
          filePath = path.join(dir, `${slugify(parts[parts.length - 1])}.md`);
        }

        fs.writeFileSync(filePath, markdown, 'utf8');
        console.log(`   ✅ 저장: ${path.relative(OUTPUT_DIR, filePath)}`);

      } catch (err) {
        console.error(`   ❌ 오류: ${err.message}`);
        errors.push({ url, title, error: err.message });
      }

      // 요청 간 딜레이 (서버 부하 방지)
      await page.waitForTimeout(800);
    }

    // 오류 리포트
    if (errors.length > 0) {
      const errorReport = errors
        .map(e => `- [${e.title}](${e.url}): ${e.error}`)
        .join('\n');
      fs.writeFileSync(
        path.join(OUTPUT_DIR, '_errors.md'),
        `# 오류 목록\n\n${errorReport}\n`,
        'utf8'
      );
      console.log(`\n⚠️  ${errors.length}개 페이지 오류 - _errors.md 확인`);
    }

    console.log(`\n🎉 완료! 총 ${links.length - errors.length}개 페이지 수집 → ${OUTPUT_DIR}`);

  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('💥 치명적 오류:', err);
  process.exit(1);
});
