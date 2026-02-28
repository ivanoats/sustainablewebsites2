import { test } from '@playwright/test';
import { join } from 'path';

const screenshotDir = process.env.SCREENSHOT_DIR || 'screenshots/before';

test.describe('Screenshots', () => {
  const pagesToTest = [
    { name: 'homepage', path: '/', screenshotName: '01-home.png' },
    { name: 'about page', path: '/about', screenshotName: '02-about.png' },
    { name: 'services page', path: '/services', screenshotName: '03-services.png' },
    { name: 'contact page', path: '/contact', screenshotName: '04-contact.png' },
    { name: 'wsg-check page', path: '/wsg-check', screenshotName: '05-wsg-check.png' },
  ];

  for (const { name, path, screenshotName } of pagesToTest) {
    test(name, async ({ page }) => {
      await page.goto(path);
      await page.screenshot({ path: join(screenshotDir, screenshotName), fullPage: true });
    });
  }
});
