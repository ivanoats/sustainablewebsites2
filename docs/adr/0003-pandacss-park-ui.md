# ADR-0003: PandaCSS and Park UI for styling

**Status:** Accepted (retroactive)
**Date:** 2026-10-12
**Deciders:** Ivan Storck

> Retroactive record. The rationale is reconstructed from the repository.

## Context

The site needs a consistent design language (the Verdant design system), accessible
form and button primitives, and a small CSS payload.

## Decision

Style with PandaCSS, which extracts atomic CSS at build time, using the Verdant
preset. Use Park UI component patterns built on Ark UI primitives, with their
slot recipes defined in `theme/recipes/`. Design tokens live in `theme/` and
`panda.config.ts`.

## Options considered

### Option A: PandaCSS with Park UI and Ark UI (chosen)

Pros: zero runtime styling cost, typed tokens and recipes, accessible
primitives, one stylesheet (about 47 KB raw, 10 KB gzipped as measured on the
current build).
Cons: a code generation step (`panda codegen`) runs before every build, test,
and type-check; the `styled-system/` output is generated, not committed.

### Option B: Tailwind CSS or plain CSS modules

Not evaluated in detail; recorded here as the usual alternatives.

## Consequences

- `prebuild`, `pretest`, and `pretype-check` scripts run `panda:gen`.
- Panda scans source files by glob (`./app/**/*.{js,jsx,ts,tsx}`), so moving
  files or changing framework means updating `include`.
- Ark UI wrappers carry a `'use client'` directive. Under Next.js that puts
  their code in the client bundle and hydrates them, even though no page
  needs interactivity from them (see ADR-0006).
- PandaCSS and Ark UI are not tied to Next.js, which keeps the styling layer
  portable (see ADR-0006).
