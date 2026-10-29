# ADR-0004: Netlify hosting and Netlify Forms

**Status:** Accepted (retroactive)
**Date:** 2026-10-12
**Deciders:** Ivan Storck

> Retroactive record. The rationale is reconstructed from the repository.

## Context

The site needs global static hosting, previews for pull requests, and a contact
form, without running a server.

## Decision

Deploy to Netlify from Git. Pushes to `main` deploy to production and pull
requests get deploy previews. Handle the contact form with Netlify Forms: a
`<form data-netlify="true">` with a honeypot field, plus `public/forms.html` so
Netlify detects the form at deploy time. Because the site runs on Netlify's
Next.js Runtime v5, the form submits with `fetch` to `/forms.html`; a full-page
POST to `/contact` reaches the Next.js handler and is silently dropped. GitHub Actions
(`.github/workflows/ci.yml`) runs lint, type-check, tests, and the build, but
does not deploy.

## Options considered

### Option A: Netlify with Netlify Forms (chosen)

Pros: no backend to run or secure, no client JavaScript for the form, previews
on every PR.
Cons: form handling is tied to Netlify; submission storage and notifications are
configured in the Netlify dashboard, not in the repository.

### Option B: Self-hosted API route or a third-party form service

Pros: portable, testable in the repository.
Cons: adds a server function or an external dependency for one form.

## Consequences

- With JavaScript, the form submits with `fetch` to `/forms.html` and shows an
  inline success or error message; this is the supported path under Next.js
  Runtime v5. Without JavaScript, or before the page finishes hydrating, the
  browser falls back to a native POST to `/forms.html`. Netlify records that
  submission and shows its default "Thank you!" page instead of the inline
  message (verified on a deploy preview, 2026-10-29).
- Moving off Netlify means replacing form handling.
- A static site on Netlify needs no framework adapter; this holds for any
  static-output framework, including Astro (ADR-0006).
