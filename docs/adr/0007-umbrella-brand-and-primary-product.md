# ADR-0007: Sustainable Websites is the umbrella brand; WSG-Check is the primary product

**Status:** Accepted
**Date:** 2026-10-12
**Deciders:** Ivan Storck

## Context

The WSG-Check business plan (dated 2026-09-27) proposed an open-core product
sold first to digital agencies, with Sustainable Websites consulting as the paid
on-ramp. It left several decisions open, including whether the paid product
carries the WSG-Check name or a Sustainable Websites brand, and whether the
business is a hybrid with services as a major revenue line.

The owner has now decided:

- Sustainable Websites is the umbrella brand.
- WSG-Check is the main product and the main driver of revenue.
- Consulting is not the long-term revenue driver, but it is the funding
  on-ramp for the first year and it stays. It is also a place to find and test
  new product ideas.
- The beachhead is US clients, especially on the West Coast, extending to
  Vancouver, BC. Not France: the owner does not speak French and is best
  positioned in the US.
- Both domains stay live: the Sustainable Websites domain and the WSG-Check
  domain.

The site today reflects the opposite emphasis. It leads with three consulting
services, and its `/wsg-check` page says "Coming Soon" although WSG-Check
v0.6.1 (CLI, MCP server, and web UI) is already released.

## Decision

Treat `sustainablewebsites.com` as the front door for the umbrella brand and
for WSG-Check. Its first job is to explain, build trust in, and convert visitors
to WSG-Check (free tool, then paid tiers). Its second job, which funds
the first year, is to win consulting and training work from West Coast and
Vancouver clients. Consulting stays in the primary navigation. The site does not
implement the product itself.

The product lives in the `wsg-check` repository, a separate Next.js and
PandaCSS application with its own API routes and Netlify deploy. Accounts,
dashboards, billing, scan history, and white-label reports belong there, not in
this site.

## Options considered

### Option A: Umbrella brand with WSG-Check as the primary product (chosen)

Pros: one brand that accumulates search authority and credibility, a clear
funnel from content to free tool to paid tier, and consulting still has a home.
Cons: the existing site needs repositioning, because its navigation and copy
lead with services.

### Option B: WSG-Check as a separate brand, Sustainable Websites as a services firm

Pros: clean separation of product and services.
Cons: two brands and two sites for one founder, and the product loses the
credibility and traffic of the established name.

### Option C: Services-first, with the product as a lead generator

This was the plan's original hybrid assumption.
Pros: services revenue early.
Cons: contradicts the owner's stated priorities and puts the weaker revenue
line at the center of the site.

## Consequences

Site purpose and content:

- WSG-Check becomes the first navigation item and the lead of the home page.
  Services stays in the primary navigation, because it funds the first year.
- The `/wsg-check` page must stop saying "Coming Soon" and point to the released
  tool. This belongs in the planned copy rewrite.
- The service descriptions should be reconciled with the packages in the
  business plan (baseline audit, remediation sprint, team training, conformance
  report). Today the site shows Audit, Architecture Consulting, and Green DevOps.

Site features implied by the business plan (candidates, not commitments):

- Product pages, a pricing page, and documentation for the CLI, MCP server,
  Agent Skill, and GitHub Action.
- Search-driven guideline-by-guideline content, which could be generated from
  the product's guideline data.
- Case studies, a changelog, and "Monitor this site" upgrade links.
- A path from the free single-URL check to sign-up.

Architecture:

- The site stays a static marketing and content site. Accounts and billing are
  out of scope for it. This is the main input to
  [ADR-0006](0006-evaluate-astro-framework.md).
- Sharing the Verdant design tokens and React components between this site and
  the product app becomes a requirement to protect.

## Open questions

- Which domain hosts the documentation and the pricing page. Both domains stay
  live, so each page needs one clear home to avoid duplicate content.
- Whether the free check is embedded in this site or links out to the product
  app.
- Whether to bill in CAD for Vancouver clients, and what that means for
  Canadian sales tax. Check with an accountant.
