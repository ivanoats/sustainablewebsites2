# Copilot Instructions for Sustainable Websites 2.0

## Project Context
- Build and maintain **Sustainable Websitesi**, a marketing/presence site for sustainable web consulting.
- Optimize first for: performance, accessibility, sustainability, and clear conversion messaging.
- Treat these as core content sources:
  - `services.md`
  - `about.md`
  - `README.md`

## Stack
- Next.js + TypeScript
- ParkUI + PandaCSS
- Netlify (deployment and forms)
- ESLint + Prettier
- Vitest + React Testing Library
- Playwright
- Storybook (component validation)
- Penpot (design specs/tokens)
- Lighthouse + Pa11y + MarkdownLint

## Priority Order
1. Performance
2. Accessibility and semantic HTML
3. W3C Web Sustainability Guidelines (WSG) alignment
4. Simplicity and maintainability
5. Conversion clarity (without hype)

## Engineering Rules
- MUST prefer SSR/SSG patterns that reduce client-side JavaScript.
- MUST avoid new dependencies unless there is clear, high-value impact.
- MUST avoid large client bundles and unnecessary runtime logic.
- MUST type props, shared models, and API responses explicitly in TypeScript.
- SHOULD reuse existing primitives and design tokens; avoid one-off styling.
- SHOULD keep logic focused; extract utilities when complexity grows.
- MUST NOT introduce breaking changes unless explicitly requested.

## UI/UX Rules
- MUST use ParkUI/Ark UI patterns for interactive elements; MUST NOT hand-roll tabs, dialogs, or similar primitives.
- MUST use PandaCSS patterns (`css`, `Stack`, `Flex`) instead of raw CSS files where possible.
- MUST match required states: hover, active, focus, disabled.
- MUST create a `.stories.tsx` file when adding a reusable UI component.
- SHOULD include Storybook controls for major component props.
- SHOULD reference Penpot tokens for spacing, typography, and color.

## Accessibility and Performance
- MUST use semantic landmarks (`header`, `main`, `nav`, `section`, `footer`) and correct heading order.
- MUST ensure keyboard accessibility and visible focus states on all interactive controls.
- MUST provide meaningful `alt` text and accessible form labels.
- MUST optimize assets for low transfer size.
- MUST avoid layout shifts and unnecessary re-renders.

## Content and Conversion
- SHOULD keep tone expert, practical, credible, and direct.
- SHOULD emphasize user outcomes: lower emissions, better performance, lower cost, better UX.
- SHOULD use specific CTAs (for example: free consultation, audit, roadmap).
- SHOULD keep claims realistic and evidence-based.
- MUST NEVER invent results, metrics, or certifications.
- SHOULD front-load value proposition in long-form pages.
- SHOULD place CTAs at logical points, not only at the end.
- SHOULD reduce CTA friction (use "free"/"no-obligation" only when accurate).
- SHOULD prefer user benefit language over process language.

## Change Scope
- SHOULD keep edits tightly scoped to the request.
- SHOULD update related markdown when messaging consistency is affected.
- SHOULD update `README.md` when architecture or tooling changes.
- SHOULD prefer small, reviewable pull-request-style diffs.

## Conflict Resolution
- If rules conflict, prioritize in this order: accessibility/performance, sustainability alignment, then conversion copy improvements.

## Copilot Output Expectations
- MUST propose minimal diffs first.
- SHOULD explain tradeoffs briefly when multiple approaches are valid.
- SHOULD suggest verification steps for non-trivial work (lint, tests, accessibility checks, Lighthouse).
