import { existsSync, mkdirSync } from 'fs';
import { DEFAULT_SCREENSHOT_DIR } from './constants';

async function globalSetup() {
  const screenshotDir = process.env.SCREENSHOT_DIR || DEFAULT_SCREENSHOT_DIR;
  if (!existsSync(screenshotDir)) {
    mkdirSync(screenshotDir, { recursive: true });
  }
}

export default globalSetup;
