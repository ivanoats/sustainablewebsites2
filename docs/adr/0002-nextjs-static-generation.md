# ADR-0002: Next.js with static generation

**Status:** Accepted (retroactive)
**Date:** 2026-10-12
**Deciders:** Ivan Storck

> Retroactive record. The decision predates the ADL and the rationale below is
> reconstructed from the repository. Correct it if the original intent differed.
> [ADR-0006](0006-evaluate-astro-framework.md) is evaluating whether to revisit
> it.

## Context

The site is a small marketing and consulting site: Home, Services, About, WSG
Check, and Contact. Every page is rendered at build time and served from a CDN.
The only form is a native HTML form handled by Netlify. The site promotes
sustainable web practice, so its own weight matters.

## Decision

Build the site with Next.js (App Router, React Server Components, TypeScript).
All routes are statically generated; there is no custom API route, server
function, or client-side data fetching.

## Options considered

### Option A: Next.js App Router (chosen)

Pros: React and TypeScript with strong tooling, file-based routing, built-in
metadata API, and a path to dynamic features if they are ever needed.
Cons: ships the React and Next.js client runtime on every page, even though no
page needs hydration. See ADR-0006 for measurements.

### Option B: Other static-first frameworks

Frameworks built around zero-JavaScript output were an alternative at the time.
ADR-0006 evaluates Astro explicitly.

## Consequences

- Pages are Server Components and produce complete HTML at build time.
- Next.js-specific code is limited to `next/image` in `Header` and the
  `Metadata` / `Viewport` types in the pages and layout.
- Every page loads the framework's client JavaScript. This is the main cost and
  the reason for ADR-0006.
- Netlify build settings live in the Netlify dashboard; there is no
  `netlify.toml` in the repository.
