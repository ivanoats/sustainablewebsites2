# ADR-0005: Markdown as the content source of truth

**Status:** Accepted (implemented in PR #83)
**Date:** 2026-10-12
**Deciders:** Ivan Storck

## Context

Page copy was duplicated. `about.md`, `services.md`, and `wsg-check.md` sat at
the repository root while the same text was hard-coded in the page components,
and the two had drifted: `services.md` described a fourth service and
different calls to action that the live page did not show. A copy rewrite is
planned, so each edit needs exactly one place to go.

## Decision

Keep page copy in `content/*.md`: YAML frontmatter for structured fields (title,
description, headings, calls to action, and the Services cards) and Markdown for
prose. Content is read and validated at build time by `app/lib/content.ts` and
rendered by `app/components/Markdown.tsx`, which maps elements to the site's
own components. Output stays fully static.

Services cards are defined as structured frontmatter rather than inferred from
heading names or paragraph order.

## Options considered

### Option A: Markdown with frontmatter, rendered with react-markdown (chosen)

Pros: one source of truth, no client JavaScript, plain files that are easy to
edit and review, and small enough to build and test in a single pull request.
Cons: adds `react-markdown` and `gray-matter`; frontmatter validation is
hand-written, not a schema library.

### Option B: MDX

Pros: embed React components in prose.
Cons: not needed, because the content has no interactive or embedded
components; adds a compile step and more author surface.

### Option C: Keep copy in components and delete the Markdown files

Pros: no new code.
Cons: copy stays mixed with layout, which makes the rewrite harder to review.

### Option D: A headless CMS

Pros: non-developer editing.
Cons: a service, an account, and a build-time fetch for five pages.

## Consequences

- Editing copy means editing `content/*.md`; the old root-level files were
  removed.
- Prose is standard Markdown. Styled variants exist only where Markdown has a
  semantic equivalent: a blockquote renders as the callout card, and a list
  renders as a checklist where a page asks for one.
- The content files and their frontmatter shape are independent of Next.js. If
  [ADR-0006](0006-evaluate-astro-framework.md) is accepted, the files carry over
  unchanged and only the loader and renderer are replaced by Astro content
  collections.
