# ADR-0006: Evaluate Astro as the site framework

**Status:** Proposed
**Date:** 2026-10-12
**Deciders:** Ivan Storck

## Context

The site sells web sustainability and is audited against the W3C Web
Sustainability Guidelines, yet every page ships the Next.js and React client
runtime although nothing on any page needs it. The contact form is a native HTML
form (ADR-0004), the navigation is plain links, and the content is static
Markdown (ADR-0005).

### Baseline measurement

Measured on a production `next build` of the current code (commit `272b61d`),
by summing the script files referenced in the prerendered HTML of each page,
each gzipped at level 9:

| Page         | HTML (raw) | Script files | Script (raw) | Script (gzip) |
| ------------ | ---------- | ------------ | ------------ | ------------- |
| `/about`     | 31 KB      | 7            | 737 KB       | 226 KB        |
| `/services`  | 31 KB      | 7            | 737 KB       | 226 KB        |
| `/wsg-check` | 20 KB      | 7            | 737 KB       | 226 KB        |
| `/contact`   | 23 KB      | 7            | 737 KB       | 226 KB        |
| `/`          | 134 KB     | 7            | 737 KB       | 226 KB        |

All five routes load the same seven script files. The home page's HTML is
much larger than the others (134 KB); I did not investigate why, and it may be
the hero art.

The stylesheet is 47 KB raw, 10 KB gzipped. Of the 226 KB of gzipped script, one
chunk of 71 KB contains React DOM's `hydrateRoot`, and another of 48 KB
contains the Ark UI component code (the `'use client'` wrappers). The remaining
107 KB is Next.js runtime and other chunks that were not attributed
individually.

These are estimates: Netlify serves Brotli, which will be smaller than gzip -9,
and no throttled load test was run. The point is the order of magnitude, not the
exact figure: the pages are static documents carrying about 226 KB of script
they do not use.

### Roadmap drivers

[ADR-0007](0007-umbrella-brand-and-primary-product.md) makes WSG-Check the
primary product and this site its front door. That raises the weight of
search performance, content volume (documentation, guideline pages, case
studies), and page weight, because the site is the main acquisition channel for
the revenue product. It also keeps accounts, dashboards, and billing in the
separate `wsg-check` application, which is already a Next.js and PandaCSS app.

This makes the question one of boundaries as much as frameworks:

- If this site stays a marketing and content site, Astro fits it better than
  Next.js.
- If the site must host product UI (accounts, dashboards), staying on Next.js is
  the simpler choice.
- Migration cost grows with content. Five pages is cheap to move today;
  documentation and dozens of guideline pages are not.
- The counterweight is founder bandwidth: two frameworks across two
  repositories is a real maintenance cost for one maintainer.

The owner has decided to keep both domains live: the Sustainable Websites
domain and the WSG-Check domain. That keeps the product application and this
marketing site separate, which supports the marketing-only condition above.

### Coupling to Next.js

Next.js-specific code is small: `next/image` in `Header`, and the `Metadata`
and `Viewport` types in the layout and five pages. Everything else is React,
TypeScript, PandaCSS, Ark UI, and Markdown.

I found no supported option in the Next.js 16 App Router documentation for
omitting the client runtime from static pages. A static export, per
a comment in Next.js's export source, copies the already-built client bundle
rather than re-bundling it. Treat the absence of an option as unverified until
the spike below confirms it.

### What Astro provides (from the Astro documentation)

- Static output is the default, and a static site on Netlify needs no adapter.
- Pages render to HTML with no client JavaScript unless a component opts in
  with a `client:*` directive.
- Content collections load Markdown with a `glob()` loader and validate
  frontmatter with a Zod schema at build time, which replaces the hand-written
  validation in `app/lib/content.ts`.
- The `@astrojs/react` integration renders existing React components, so
  components can be reused and hydrated only where needed.
- PandaCSS has an Astro setup guide (the `@pandacss/vite` plugin and an
  `include` glob that covers `.astro` files).

## Decision

**Not yet decided.** Run a time-boxed spike, then decide.

Recommendation: proceed with Astro if the spike confirms the risks below are
manageable and this site stays a marketing and content site, with the product UI
in the separate `wsg-check` application (ADR-0007). It fits a static, content-first site better than Next.js does, and
it removes the contradiction of a sustainability consultancy shipping unused
framework JavaScript. If the spike surfaces a blocking problem, stay on Next.js
and record that here.

## Options considered

### Option A: Stay on Next.js

| Dimension        | Assessment                                      |
| ---------------- | ----------------------------------------------- |
| Complexity       | Lowest; nothing to change                       |
| Cost             | None now; ongoing runtime payload on every page |
| Scalability      | Strong if dynamic features are added later      |
| Team familiarity | High                                            |

Pros: no migration, no risk, keeps the path open to server features.
Cons: about 226 KB gzipped script per page that no page uses; the site's own
weight contradicts its message.

### Option B: Migrate to Astro (recommended, pending spike)

| Dimension        | Assessment                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Complexity       | Medium; five pages, small Next.js coupling                                                          |
| Cost             | Roughly a few days of work (estimate, to be confirmed by the spike)                                 |
| Scalability      | Fits static and content growth, such as the planned blog; SSR is available via an adapter if needed |
| Team familiarity | Unknown; ask the owner                                                                              |

Pros: near-zero JavaScript by default, content collections with schema
validation, the same host and form setup, and the existing React, PandaCSS, and
Ark UI code carry over.
Cons: a migration to do and test; a new framework to learn; some Markdown
presentation currently done by React component mapping needs a different
approach (see risks).

### Option C: Another static-site generator such as Eleventy

Pros: similarly light output.
Cons: weaker fit with the existing React components and TypeScript, and no
content-collection schema equivalent. Not recommended, but not evaluated in
depth.

### Option D: Next.js plus mitigations

Trim the bundle by removing `'use client'` from components that do not need it
and dropping `next/image`.

Pros: no framework change.
Cons: does not remove the React and Next.js client runtime. Worth trying only
if Astro is rejected.

## Trade-off analysis

The deciding question is whether the site will stay static. Everything
currently on the roadmap is static (pages, a blog placeholder, a form handled by
Netlify), which favors Astro. If a feature arrives that needs server rendering
or rich client state, Astro can host it through an adapter and islands, but
Next.js would be the more natural home. The migration is cheapest now: five
pages, one component using a Next.js API, and content already independent of the
framework.

## Spike plan

Time-box: one working day on a branch. Port `/wsg-check` and `/about` (the
Markdown pages), keep everything else on Next.js.

1. Add Astro, `@astrojs/react`, and `@pandacss/vite`; point Panda's `include`
   at the Astro source.
2. Render the existing `Header`, `Footer`, `CTAButton`, `Card`, and `Link`
   React components without a client directive. Confirm Ark UI components
   server-render correctly with no hydration.
3. Move `content/*.md` into content collections with Zod schemas.
4. Reproduce the three Markdown presentations: external links opening in a new
   tab, the blockquote callout card, and the checklist.
5. Build, then measure script bytes per page and a Lighthouse run against the
   same pages, using the table above as the baseline.
6. Confirm Netlify Forms still detects `public/forms.html` and the contact form.
7. Prove the interactive case: embed a URL-check form as a single hydrated
   island on an otherwise static page, and measure the extra script.
8. Generate a handful of guideline pages from a content collection, to test the
   content-volume case.
9. Check that the Verdant tokens and React components can be shared with the
   `wsg-check` repository, and look at Astro's documentation tooling for the
   product docs.

### Risks to verify

- Astro applies component mapping to MDX, not plain Markdown. The three
  Markdown presentations may need a rehype plugin, scoped CSS, or switching those
  pages to MDX. This is my understanding of the Astro documentation and is
  unverified.
- Ark UI context-based primitives may need a client directive in some cases.
- Tooling is coupled to Next.js more than the source is. Playwright starts the
  app with `npm run dev` locally and `npm run build && npm run start` in CI,
  ESLint uses `eslint-config-next`, and `next-env.d.ts` and the `dev`, `build`,
  and `start` scripts are Next.js-specific. Each needs replacing.
- Storybook and Vitest use React and Vite and should carry over once the `@/`
  aliases are re-pointed. Page tests render page components directly (the
  contact page test imports `./page` as a React component), so any page that
  becomes an `.astro` file needs a different test approach.
- Node version support for the current Astro release should be checked against
  `.nvmrc` (22.22.0).

## Spike results

The spike is in `spikes/astro-site/` (Astro 7.3.8 with `@astrojs/react` 7.0.1).
It reuses the repository's React, Ark UI, theme, and components by path and
builds all five routes, a hydrated-island page, and 71 generated guideline
pages (78 pages in about 3.5 seconds). It is excluded from the root lint,
type-check, and Prettier. It was built and measured on 2026-10-12, locally; it
has not been deployed.

### Measurements

Same content and production builds. Each Next.js page loads seven script files
(226 KB gzipped) on every route, plus inline scripts inside the HTML that the
baseline above did not count.

| Route        | Next scripts (gzip) | Next HTML (inline script) | Astro scripts | Astro HTML |
| ------------ | ------------------- | ------------------------- | ------------- | ---------- |
| `/`          | 226 KB              | 134 KB (83 KB)            | 0             | 50 KB      |
| `/about`     | 226 KB              | 31 KB (20 KB)             | 0             | 9 KB       |
| `/services`  | 226 KB              | 31 KB (20 KB)             | 0             | 10 KB      |
| `/wsg-check` | 226 KB              | 20 KB (13 KB)             | 0             | 4 KB       |
| `/contact`   | 226 KB              | 23 KB (15 KB)             | 0             | 7 KB       |

- Stylesheet: Next.js 47 KB raw, 10 KB gzipped; Astro 38 KB raw, 10 KB gzipped.
- The island page (`/try`, a URL form hydrated with `client:load`) loads about
  71 KB gzipped of script: React DOM 66 KB, React 3 KB, the component 0.5 KB, and
  2 KB inline. Pages without an island load none.
- Lighthouse on `/about`, three runs each against local production servers
  (headless Chromium, default simulated mobile throttling):

|         | Performance   | Total blocking time | Largest contentful paint | Page weight |
| ------- | ------------- | ------------------- | ------------------------ | ----------- |
| Next.js | 96, 93, 97    | 160 ms              | 2.4 s                    | 204 KiB     |
| Astro   | 100, 100, 100 | 0 ms                | 0.9 s                    | 33 KiB      |

Best Practices, Accessibility, and SEO were 100 for both. Lighthouse reported
89 KiB of unused JavaScript on the Next.js page and none on Astro. These are
local runs of one page. Netlify's deploy-preview Lighthouse runs for the
current Next.js site scored Best Practices 92, which did not reproduce locally.

- Visual parity: full-page Chromium screenshots at 1280 px wide for all five
  routes have identical heights and at most 0.02% differing pixels, after the
  fixes below.

### Findings

- **Component reuse works.** `Header`, `Footer`, `CTAButton`, `Card`, `Link`,
  `VerdantArt`, and the Ark UI form fields render with no hydration. The home,
  Services, and Contact pages render the existing React page components
  unchanged and are pixel-identical. The only Next.js import that needed
  replacing was `next/image`, with a 30-line shim.
- **Compound components cannot span an `.astro` template.** Park UI's
  `Card.Root` and `Card.Body` share React context, and each React component
  used from an `.astro` file renders separately, so the build failed with
  "missing its Provider". The fix is to compose them inside one React component
  (the spike's `CardShell`). Any compound Park UI or Ark UI component used
  directly in a template needs the same wrapper.
- **Markdown presentation needs CSS and rehype plugins, not component mapping.**
  External links use `rehype-external-links`; the callout is a real
  `<blockquote>` given the Card recipe classes by a small rehype plugin; the
  checklist is CSS. Three Astro 7 behaviors had to be handled:
  - The default Markdown processor does not run rehype plugins. Install
    `@astrojs/markdown-remark` and pass `unified({...})` to `markdown.processor`.
  - Smart punctuation is on by default and changed "We're" to "We’re". Set
    `smartypants: false`.
  - The Next.js version lays Markdown out as a flex column with a gap, which
    stops margins collapsing. The CSS wrapper needs `display: flex` to match.
- **Content collections work.** Zod schemas validate the same three Markdown
  files and a 71-entry guideline list, and replace `app/lib/content.ts` and
  `app/components/Markdown.tsx`.
- **PandaCSS works** through the CLI code generation with the root config
  spread into a spike config whose `include` covers `../../app` and `.astro`
  files. The Vite plugin was not tried.
- **Netlify:** static output needs no adapter. The built contact page keeps
  `data-netlify`, the honeypot, and `form-name`, and `forms.html` is copied. A
  real Netlify deploy was not run, so form detection is unverified.
- **Docs tooling:** Starlight 0.42.6 declares a peer of `astro ^7.2.10`. It was
  not tried.
- **Not tested:** sharing tokens and components with the `wsg-check` repository,
  Storybook, Vitest, Playwright, and ESLint against the Astro app, the dev
  server (only build and preview ran), and a Netlify deploy.

### Recommendation after the spike

Astro is viable for this site. It removes all script from static pages, cuts
page weight and blocking time sharply in a local Lighthouse comparison, and
renders the existing pages without visible change. Migration work is mostly
mechanical: move routes to `src/pages`, replace the Next.js scripts, Playwright
server command, ESLint config, and CI steps, re-point Storybook and Vitest
aliases, change how page components are tested, and update the Netlify build
settings. The wrapper pattern for compound components is the main new
convention.

Both domains stay live and documentation and pricing live on WSG-Check.com
(ADR-0007), which keeps this site a marketing and content site. That is the
condition under which this ADR recommends Astro. The status stays Proposed
until the owner decides to migrate.

## Consequences

If accepted:

- Most of the site (content, theme, components, tests, Netlify Forms) carries
  over. Routing, layout, and metadata move from `app/` to `src/pages/` and
  `<head>`.
- `app/lib/content.ts` and `app/components/Markdown.tsx` from ADR-0005 are
  replaced by content collections. ADR-0005's decision to keep Markdown content
  stays; its implementation changes. ADR-0002 would become Superseded by this
  ADR.
- `docs/architecture.md`, `docs/data-flows.md`, `docs/components.md`, the
  README, and the architecture-docs agent instructions are updated in the same
  pull request as the migration.

If rejected:

- Record why here, mark this ADR Rejected, and consider Option D.

## Action items

1. [x] Owner: confirm familiarity and appetite for a one-day spike. Confirmed 2026-10-12.
2. [x] Run the spike and record measurements in this ADR. See Spike results.
3. [ ] Decide, then set the status and update the log in `docs/adr/README.md`.
4. [ ] If accepted, write the migration plan and update the architecture docs.
