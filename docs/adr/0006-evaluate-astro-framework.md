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

1. [ ] Owner: confirm familiarity and appetite for a one-day spike.
2. [ ] Run the spike and record measurements in this ADR.
3. [ ] Decide, then set the status and update the log in `docs/adr/README.md`.
4. [ ] If accepted, write the migration plan and update the architecture docs.
