import { test } from '@playwright/test';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const screenshotDir = 'screenshots/before';

// Ensure screenshot directory exists
if (!existsSync(screenshotDir)) {
  mkdirSync(screenshotDir, { recursive: true });
}

test.describe('Before Screenshots', () => {
  test('homepage', async ({ page }) => {
    await page.goto('/');
    await page.screenshot({ path: join(screenshotDir, '01-home.png'), fullPage: true });
  });

  test('about page', async ({ page }) => {
    await page.goto('/about');
    await page.screenshot({ path: join(screenshotDir, '02-about.png'), fullPage: true });
  });

  test('services page', async ({ page }) => {
    await page.goto('/services');
    await page.screenshot({ path: join(screenshotDir, '03-services.png'), fullPage: true });
  });

  test('contact page', async ({ page }) => {
    await page.goto('/contact');
    await page.screenshot({ path: join(screenshotDir, '04-contact.png'), fullPage: true });
  });

  test('wsg-check page', async ({ page }) => {
    await page.goto('/wsg-check');
    await page.screenshot({ path: join(screenshotDir, '05-wsg-check.png'), fullPage: true });
  });
});
