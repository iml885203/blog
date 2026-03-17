import { test, expect } from '@playwright/test';

test.describe('Dark mode toggle', () => {
  test('first visit (no localStorage): clicking toggle switches to dark', async ({ page }) => {
    // Clear storage before visiting
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();

    const html = page.locator('html');
    const toggle = page.locator('#theme-toggle');

    // Initial state: should be light (no dark class)
    await expect(html).not.toHaveClass(/dark/);

    // Click toggle
    await toggle.click();

    // Should now be dark
    await expect(html).toHaveClass(/dark/);
    const stored = await page.evaluate(() => localStorage.getItem('theme'));
    expect(stored).toBe('dark');
  });

  test('after setting dark in localStorage: clicking toggle switches to light', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('theme', 'dark'));
    await page.reload();

    const html = page.locator('html');
    const toggle = page.locator('#theme-toggle');

    // Should start dark
    await expect(html).toHaveClass(/dark/);

    // Click toggle → light
    await toggle.click();

    await expect(html).not.toHaveClass(/dark/);
    const stored = await page.evaluate(() => localStorage.getItem('theme'));
    expect(stored).toBe('light');
  });

  test('toggle survives navigation via View Transitions', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('theme', 'dark'));
    await page.reload();

    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);

    // Navigate to another page via link click (View Transitions)
    await page.locator('a[href^="/"]').first().click();
    await page.waitForURL(/./);

    // Dark mode should persist
    await expect(html).toHaveClass(/dark/);
  });
});
