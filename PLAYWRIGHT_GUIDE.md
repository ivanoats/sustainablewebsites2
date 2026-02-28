# Playwright Screenshot Guide

This project uses Playwright to capture "before" and "after" screenshots for visual comparison of design iterations.

## Setup

Playwright is configured in [`playwright.config.ts`](./playwright.config.ts) and screenshot tests are in [`e2e/screenshots.spec.ts`](./e2e/screenshots.spec.ts).

## Workflow

### 1. Capture Before Screenshots
Before making layout/styling changes, capture the current state:

```bash
npm run screenshots
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
After changes, capture the new state:

```bash
npm run screenshots
```

Then move the screenshots to `screenshots/after/`:

```bash
mv screenshots/before screenshots/after
```

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
2. Run `npm run screenshots` to capture the new page
