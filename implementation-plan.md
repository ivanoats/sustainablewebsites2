# Sustainable Websites 2.0 — Implementation Plan

## Phase 1: Foundation & Core Pages (Weeks 1–2)
**Goal:** Establish sustainable baseline with semantic HTML and core pages

- [x] Audit current project structure (Next.js setup, routing, component organization)
- [x] Set up or verify PandaCSS + ParkUI integration
- [x] Create semantic HTML layout (header, nav, main, footer landmarks)
- [x] Build **Home** page with value proposition and primary CTA
- [x] Build **Services** page (from `services.md`)
- [x] Build **About** page (from `about.md`)
- [x] Build **Contact** page with Netlify Forms integration
- [x] Create reusable component library with `.stories.tsx` files (e.g., CTA buttons, card, hero)
- [x] Establish TypeScript types for content, props, and API responses

## Phase 2: Accessibility & Semantic Standards (Weeks 2–3)
**Goal:** Ensure WCAG compliance and semantic correctness

- [ ] Audit with Pa11y; fix keyboard navigation, focus states, ARIA labels
- [ ] Verify heading hierarchy and semantic landmarks on all pages
- [ ] Test with screen readers
- [ ] Add accessible form labels and error states (Contact form)
- [ ] Document accessibility patterns in Storybook
- [ ] Update README with accessibility verification steps

## Phase 3: Performance Optimization (Weeks 3–4)
**Goal:** Minimize transfer size and energy consumption (Lighthouse target: 90+)

- [ ] Audit with Lighthouse; identify and remove blocking resources
- [ ] Optimize images (format, size, lazy-load where appropriate)
- [ ] Minimize client-side JavaScript (SSR/SSG patterns, avoid unnecessary hydration)
- [ ] Code-split and lazy-load non-critical components
- [ ] Minify and tree-shake dependencies
- [ ] Cache strategy (static/revalidation timing)
- [ ] Carbon footprint baseline audit

## Phase 4: W3C Sustainability Guidelines & Content (Weeks 4–5)
**Goal:** Align with WSG and refine conversion messaging

- [ ] Review WSG compliance (user perception, sustainability claims, carbon transparency)
- [ ] Refactor messaging to emphasize outcomes: lower emissions, cost savings, better performance
- [ ] Review all claims against evidence (no invented metrics)
- [ ] Refine CTA copy and placement for conversion clarity (avoid hype)
- [ ] Create dedicated pages/sections for sustainability value prop if needed
- [ ] Update `README.md` with WSG alignment claim details

## Phase 5: Testing & CI/CD (Weeks 5–6)
**Goal:** Automate quality gates and establish confidence in releases

- [ ] Set up Vitest + React Testing Library (unit + integration tests)
- [ ] Set up Playwright (E2E tests for critical user flows: landing → CTA → form)
- [ ] Configure GitHub Actions CI/CD pipeline
  - Lint with ESLint + Prettier
  - Run Vitest + Playwright
  - Run Lighthouse (performance gate)
  - Run Pa11y (accessibility gate)
  - Run MarkdownLint
- [ ] Document test and deployment procedures in README

## Phase 6: Refinement & Ongoing (Weeks 6+)
**Goal:** Continuous optimization and scalability for blog/future content

- [ ] Blog architecture & placeholder content page
- [ ] Monitor Lighthouse and Pa11y scores; set baseline benchmarks
- [ ] Establish content audit schedule (messaging, claims, CTA effectiveness)
- [ ] Performance monitoring (Core Web Vitals, carbon emissions tracking)
- [ ] Plan feature roadmap (e.g., case studies, testimonials, sustainability calculator)

---

## Key Success Criteria
- Lighthouse ≥ 90 across all pages
- Pa11y automated audit passes on all pages
- All interactive components keyboard-accessible with visible focus
- Zero invented claims or unsubstantiated metrics
- Clear CTA hierarchy aligned with visitor journey
- CI/CD pipeline catches regressions before deploy
