# Astro spike (ADR-0006)

A reference implementation, not part of the product build. It renders this
repository's pages with Astro to measure the migration described in
[ADR-0006](../../docs/adr/0006-evaluate-astro-framework.md).

React, Ark UI, the PandaCSS theme, and the components in `app/` resolve from the
repository root, so install the root first.

```bash
npm install            # in the repository root
cd spikes/astro-site
npm install --legacy-peer-deps
npm run build          # panda codegen, then astro build, output in dist/
npm run preview        # http://localhost:4321
```

`--legacy-peer-deps` stops npm installing a second copy of React.

What is here:

- `src/pages/` renders all five routes, a hydrated-island page (`try`), and 71
  generated guideline pages.
- `src/content.config.ts` validates the shared Markdown in `../../content` with
  Zod.
- `src/components/CardShell.tsx` shows the wrapper needed for compound Park UI
  components.
- `src/shims/next-image.tsx` replaces `next/image`.
