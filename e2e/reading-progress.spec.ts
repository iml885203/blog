import { test, expect } from '@playwright/test';

test.describe('Reading progress bar', () => {
  test('progress bar works on direct article visit', async ({ page }) => {
    await page.goto('/best-macos-personal-productivity-software/');
    await page.waitForLoadState('networkidle');

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    // Progress bar should be near 100%
    const barWidth = await page.evaluate(() => {
      const bars = document.querySelectorAll('#reading-progress-bar');
      if (bars.length === 0) return null;
      return { count: bars.length, width: (bars[bars.length - 1] as HTMLElement).style.width };
    });

    console.log('Direct visit bar:', barWidth);
    expect(barWidth).not.toBeNull();
    expect(barWidth!.count).toBe(1); // Should only have ONE progress bar
    const pct = parseFloat(barWidth!.width);
    expect(pct).toBeGreaterThan(80);
  });

  test('progress bar works after navigating from homepage via View Transitions', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click first article link
    await page.locator('article a[href^="/"]').first().click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);

    // Check progress bar
    const barWidth = await page.evaluate(() => {
      const bars = document.querySelectorAll('#reading-progress-bar');
      return { count: bars.length, width: bars.length > 0 ? (bars[bars.length - 1] as HTMLElement).style.width : '0%' };
    });

    console.log('After navigation bar:', barWidth);
    expect(barWidth.count).toBe(1); // Should NOT have multiple bars
    const pct = parseFloat(barWidth.width);
    expect(pct).toBeGreaterThan(80);
  });

  test('only one progress bar exists after multiple navigations', async ({ page }) => {
    await page.goto('/');
    // Navigate to article
    await page.locator('article a[href^="/"]').first().click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);

    // Go back to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate again
    await page.locator('article a[href^="/"]').first().click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);

    const barCount = await page.evaluate(() =>
      document.querySelectorAll('#reading-progress-bar').length
    );
    console.log('Bar count after 2 navigations:', barCount);
    expect(barCount).toBeLessThanOrEqual(1);
  });
});
