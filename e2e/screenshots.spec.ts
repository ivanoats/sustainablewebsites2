import { test } from '@playwright/test';
import path from 'path';
import { DEFAULT_SCREENSHOT_DIR } from './constants';

const screenshotDir = process.env.SCREENSHOT_DIR || path.join(process.cwd(), DEFAULT_SCREENSHOT_DIR);

test.describe('Screenshots', () => {
  const pagesToTest = [
    { name: 'homepage', path: '/', screenshotName: '01-home.png' },
    { name: 'about page', path: '/about', screenshotName: '02-about.png' },
    { name: 'services page', path: '/services', screenshotName: '03-services.png' },
    { name: 'contact page', path: '/contact', screenshotName: '04-contact.png' },
    { name: 'wsg-check page', path: '/wsg-check', screenshotName: '05-wsg-check.png' },
  ];

  for (const { name, path: pagePath, screenshotName } of pagesToTest) {
    test(name, async ({ page }) => {
      await page.goto(pagePath);
      await page.screenshot({ path: path.join(screenshotDir, screenshotName), fullPage: true });
    });
  }
});
