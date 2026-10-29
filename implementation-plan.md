# Sustainable Websites 2.0 — Implementation Plan

Phases run in order; there are no week targets. An item is done only when it is
verified on the production site, not just merged.

Context that shapes this plan:

- Sustainable Websites is the umbrella brand and marketing site; WSG-Check is
  the primary product, and documentation and pricing live there
  ([ADR-0007](docs/adr/0007-umbrella-brand-and-primary-product.md)).
- Moving from Next.js to Astro is proposed and spiked but not decided
  ([ADR-0006](docs/adr/0006-evaluate-astro-framework.md)). Phase 3 waits on
  that decision.
- Accessibility checks use axe-core: `jest-axe` in Vitest and
  `@axe-core/playwright` for full pages.

## Phase 1: Foundation & Core Pages

**Goal:** Establish sustainable baseline with semantic HTML and core pages

- [x] Audit current project structure (Next.js setup, routing, component
      organization)
- [x] Set up or verify PandaCSS + ParkUI integration
- [x] Create semantic HTML layout (header, nav, main, footer landmarks)
- [x] Build **Home** page with value proposition and primary CTA
- [x] Build **Services** page (from `content/services.md`)
- [x] Build **About** page (from `content/about.md`)
- [x] Build **Contact** page with Netlify Forms integration (fixed and verified
      in production 2026-10-28: Forms enabled, AJAX submit for Next.js
      Runtime v5)
- [x] Create reusable component library with `.stories.tsx` files (e.g., CTA
      buttons, card, hero)
- [x] Establish TypeScript types for content, props, and API responses

## Phase 2: Accessibility & Semantic Standards

**Goal:** Meet WCAG 2.2 AA and keep it from regressing

- [x] Add accessible form labels and error states (Contact form)
- [x] Add `jest-axe` component checks to Vitest (Contact form)
- [ ] Add `@axe-core/playwright` page scans for every route and run them in CI
      as a blocking check
- [ ] Audit keyboard navigation and focus states on all pages (Contact done)
- [ ] Verify heading hierarchy and semantic landmarks on all pages
- [ ] Test with screen readers (VoiceOver on macOS and iOS at minimum)
- [ ] Document accessibility patterns in Storybook with `@storybook/addon-a11y`
      (confirm Storybook's future first if ADR-0006 is accepted)
- [ ] Update README with accessibility verification steps

## Phase 3: Performance Optimization

**Goal:** Minimize transfer size and energy consumption (Lighthouse target: 90+)

- [ ] Decide ADR-0006 (Astro migration). If accepted, migrate first; the
      JavaScript and hydration items below then mostly fall away.
- [ ] Audit with Lighthouse; identify and remove blocking resources
- [ ] Optimize images (format, size, lazy-load where appropriate)
- [ ] Minimize client-side JavaScript (SSR/SSG patterns, avoid unnecessary
      hydration)
- [ ] Code-split and lazy-load non-critical components
- [ ] Minify and tree-shake dependencies
- [ ] Cache strategy (static/revalidation timing)
- [ ] Carbon footprint baseline audit

## Phase 4: W3C Sustainability Guidelines & Content

**Goal:** Align with WSG and refine conversion messaging

- [ ] Review WSG compliance (user perception, sustainability claims, carbon
      transparency)
- [ ] Refactor messaging to emphasize outcomes: lower emissions, cost savings,
      better performance
- [ ] Position WSG-Check as the primary product and consulting as the on-ramp,
      linking to WSG-Check for documentation and pricing (ADR-0007)
- [ ] Review all claims against evidence (no invented metrics)
- [ ] Refine CTA copy and placement for conversion clarity (avoid hype)
- [ ] Update `README.md` with WSG alignment claim details

## Phase 5: Testing & CI/CD

**Goal:** Automate quality gates and establish confidence in releases

- [x] Set up Vitest + React Testing Library (unit + integration tests)
- [x] Configure GitHub Actions CI (ESLint, MarkdownLint, type-check, Vitest,
      build)
- [ ] Add Playwright E2E tests for critical user flows (landing → CTA → form
      submission, with the form endpoint mocked)
- [ ] Run Playwright in CI
- [ ] Make Lighthouse a blocking performance check (Netlify runs it on deploy
      previews today but does not block)
- [ ] Document test and deployment procedures in README

## Phase 6: Refinement & Ongoing

**Goal:** Continuous optimization and scalability for blog/future content

- [ ] Blog architecture & placeholder content page
- [ ] Monitor Lighthouse and axe results; set baseline benchmarks
- [ ] Establish content audit schedule (messaging, claims, CTA effectiveness)
- [ ] Performance monitoring (Core Web Vitals, carbon emissions tracking)
- [ ] Plan feature roadmap around driving visitors to WSG-Check (e.g., case
      studies, testimonials)

---

## Key Success Criteria

- Lighthouse ≥ 90 across all pages
- axe reports no WCAG 2.2 AA violations on any page
- All interactive components keyboard-accessible with visible focus
- Zero invented claims or unsubstantiated metrics
- Clear CTA hierarchy aligned with visitor journey
- CI/CD pipeline catches regressions before deploy
- Features are verified on the production site, not only in tests
