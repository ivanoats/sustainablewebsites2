# Sustainable Websites 2.0

## Synopsis

Sustainable Websites 2.0

## Technologies Used

- NextJS
- TypeScript
- ParkUI
- PandaCSS
- Netlify
- ESLint
- Prettier
- Lighthouse
- Pa11y
- MarkdownLint

## Runtime Requirements

- Node.js 22.22.0 or newer (matches `.nvmrc`)

## Features

- Conformance to WSG Sustainability Guidelines
- Optimized performance for reduced energy consumption audited with Lighthouse
- Responsive design for various devices
- Accessibility compliance audited with Pa11y.
- Github Actions CI/CD pipeline for automated testing and linting with ESLint
  and Prettier

## Testing Notes

- Run unit/component tests with `npm test` (Vitest).
- Run screenshot E2E checks with `npm run screenshots` (Playwright).
- Use `npm run screenshots:before` and `npm run screenshots:after` for visual
  baseline comparison flows.
- If Playwright browsers are missing, install them once with
  `npx playwright install`.

## Information Architecture

- Services - copy in `content/services.md`
- About - copy in `content/about.md`
- WSG-Check - tool page describing the W3C Web Sustainability Guidelines auditor
  (copy in `content/wsg-check.md`)
- Contact - contact form with Netlify Forms
- Blog - placeholder for future content on sustainable web development practices

## Architecture Documentation

- [Architecture Overview](docs/architecture.md) — C4 context and containers
- [Data Flows](docs/data-flows.md) — build, rendering, and form submission
- [Component Architecture](docs/components.md) — UI components and design tokens
- [Architecture Decision Log](docs/adr/README.md) — why the system is the way it
  is, including the open question of moving to Astro
