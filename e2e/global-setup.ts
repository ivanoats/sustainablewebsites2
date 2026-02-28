import { existsSync, mkdirSync } from 'fs';

async function globalSetup() {
  const screenshotDir = process.env.SCREENSHOT_DIR || 'screenshots/before';
  if (!existsSync(screenshotDir)) {
    mkdirSync(screenshotDir, { recursive: true });
  }
}

export default globalSetup;
