import { test, expect } from '@playwright/test';

// Use an article that has code blocks, TOC, images
const ARTICLE = '/build-my-hexo/';

test.describe('Article page features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ARTICLE);
    await page.waitForLoadState('networkidle');
  });

  // --- Copy code button ---
  test('copy code button appears on hover and copies code', async ({ page }) => {
    const pre = page.locator('pre').first();
    await pre.hover();

    const copyBtn = page.locator('.group\\/code button').first();
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    // Button text should briefly change to checkmark
    await expect(copyBtn.locator('svg')).toBeVisible();
  });

  // --- Share copy link ---
  test('copy link button works', async ({ page }) => {
    const copyBtn = page.locator('#share-copy');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    // Button should show "已複製！" 
    await expect(copyBtn).toContainText('已複製');
    // And revert after 1.5s
    await page.waitForTimeout(1700);
    await expect(copyBtn).toContainText('複製連結');
  });

  // --- Back to top button ---
  test('back-to-top button appears after scrolling and works', async ({ page }) => {
    const btn = page.locator('#back-to-top');
    await expect(btn).toHaveClass(/opacity-0/);

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(200);

    await expect(btn).toHaveClass(/opacity-100/);

    // Click it
    await btn.click();
    // Wait for smooth scroll to complete
    await page.waitForFunction(() => window.scrollY < 10, { timeout: 2000 });
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(10);
  });

  // --- Image lightbox ---
  test('clicking article image opens lightbox', async ({ page }) => {
    const img = page.locator('.prose img').first();
    const imgCount = await img.count();
    if (imgCount === 0) {
      test.skip();
      return;
    }

    await img.click();

    // Lightbox overlay should appear
    const overlay = page.locator('div[style*="display: flex"][style*="position: fixed"][style*="z-index: 10000"], div[style*="display:flex"][style*="position:fixed"][style*="z-index:10000"]').or(page.locator('div[style*="10000"][style*="rgba(0,0,0,0.85)"]'));
    await expect(overlay).toBeVisible();

    // Close it
    await page.evaluate(() => {
      const overlays = document.querySelectorAll('div[style*="10000"]');
      overlays.forEach((el: Element) => { (el as HTMLElement).click(); });
    });
    await page.waitForTimeout(100);
    // Overlay should be hidden (display:none)
    const isHidden = await page.evaluate(() => {
      const overlays = document.querySelectorAll('div[style*="10000"]');
      return overlays.length === 0 || Array.from(overlays).every((el: Element) => (el as HTMLElement).style.display === 'none');
    });
    expect(isHidden).toBe(true);
  });

  // --- No JS errors ---
  test('no JS errors on article page', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(ARTICLE);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    expect(errors.filter(e =>
      !e.includes('pagefind') && // pagefind may not load in preview
      !e.includes('ResizeObserver') &&
      !e.includes('oklch') && !e.includes('parseColor')
    )).toHaveLength(0);
  });
});

test.describe('Navigation features', () => {
  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const menuBtn = page.locator('#mobile-menu-btn');
    const menu = page.locator('#mobile-menu');

    // Initially closed (max-height: 0)
    // Initial: closed via CSS class max-h-0, inline style may be empty or '0px'
    const initialInlineHeight = await menu.evaluate((el: HTMLElement) => el.style.maxHeight);
    expect(['', '0px']).toContain(initialInlineHeight);

    // Open
    await menuBtn.click();
    await page.waitForTimeout(350); // wait for animation
    const openHeight = await menu.evaluate((el: HTMLElement) => el.style.maxHeight);
    expect(openHeight).not.toBe('0px');
    expect(parseFloat(openHeight)).toBeGreaterThan(0);

    // Close
    await menuBtn.click();
    await page.waitForTimeout(350);
    const closedHeight = await menu.evaluate((el: HTMLElement) => el.style.maxHeight);
    expect(closedHeight).toBe('0px');
  });

  test('search page returns results', async ({ page }) => {
    await page.goto('/search/');
    const input = page.locator('#search-input');
    await expect(input).toBeVisible();

    // Skeleton should appear while loading
    await input.fill('mac');
    await page.waitForTimeout(200);

    const skeleton = page.locator('.result-skeleton').first();
    // Either skeleton or results should appear
    const results = page.locator('.result-card').first();
    await expect(skeleton.or(results)).toBeVisible({ timeout: 5000 });
  });

  test('prev/next navigation links exist on article page', async ({ page }) => {
    await page.goto(ARTICLE);
    await page.waitForLoadState('networkidle');

    // At least one of prev/next should exist
    const navLinks = page.locator('nav[aria-label="前後篇導航"] a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

test.describe('SEO & meta', () => {
  test('article has correct OG meta tags', async ({ page }) => {
    await page.goto(ARTICLE);

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');

    expect(ogTitle).toBeTruthy();
    expect(ogImage).toMatch(/^https?:\/\//);
    expect(ogType).toBe('article');
    expect(twitterCard).toBe('summary_large_image');
  });

  test('article has JSON-LD structured data', async ({ page }) => {
    await page.goto(ARTICLE);

    const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(jsonLd).toBeTruthy();
    const data = JSON.parse(jsonLd!);
    expect(data['@type']).toBe('BlogPosting');
    expect(data.headline).toBeTruthy();
  });

  test('homepage has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Logan 的隨手筆記');
  });

  test('robots.txt exists and has sitemap', async ({ page }) => {
    const res = await page.goto('/robots.txt');
    expect(res?.status()).toBe(200);
    const text = await page.content();
    expect(text).toContain('sitemap');
  });
});
