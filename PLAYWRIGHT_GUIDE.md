# Playwright Screenshot Guide

This project uses Playwright to capture "before" and "after" screenshots for visual comparison of design iterations.

## Setup

Playwright is configured in [`playwright.config.ts`](./playwright.config.ts) and screenshot tests are in [`e2e/screenshots.spec.ts`](./e2e/screenshots.spec.ts).

Before running any screenshot scripts, install the required browser binaries:

```bash
npx playwright install
```

On CI or a fresh system you may also need the OS-level dependencies:

```bash
npx playwright install --with-deps
```

## Workflow

### 1. Capture Before Screenshots
Before making layout/styling changes, capture the current state:

```bash
npm run screenshots:before
```

This creates screenshots in `screenshots/before/`:
- `01-home.png` — Homepage
- `02-about.png` — About page
- `03-services.png` — Services page
- `04-contact.png` — Contact page
- `05-wsg-check.png` — WSG Check page

### 2. Make Your Changes
Update components, styles, layout, etc.

### 3. Capture After Screenshots
After changes, capture the new state with a single command:

```bash
npm run screenshots:after
```

This automatically saves screenshots to `screenshots/after/` — no manual directory moves needed.

### 4. Compare
Compare the before and after screenshots side-by-side to validate visual changes.

## Tips

- Run `npm run dev` first if you want to test against a modified dev server
- Playwright automatically launches the dev server (on port 3000) when running tests
- Full-page screenshots capture the entire height of each page
- Screenshots are high-resolution and suitable for detailed review

## HTML Report

View the Playwright test report in the browser:

```bash
npx playwright show-report
```

This opens an interactive HTML report showing test results and any failures.

## Customization

To add more pages to screenshot:

1. Add a new test in [e2e/screenshots.spec.ts](./e2e/screenshots.spec.ts)
2. Run `npm run screenshots:before` to regenerate all baseline screenshots (this updates all pages, not just the new one) and `npm run screenshots:after` to capture the updated state

> **Tip:** To capture screenshots for only your new page without re-running all tests, use Playwright's `--grep` flag with the test name you defined:
> ```bash
> SCREENSHOT_DIR=screenshots/before npx playwright test --grep "new page name"
> SCREENSHOT_DIR=screenshots/after npx playwright test --grep "new page name"
> ```
> Alternatively, you can temporarily use `test.only` in `e2e/screenshots.spec.ts` to isolate your new test during development (remember to remove it before committing).
