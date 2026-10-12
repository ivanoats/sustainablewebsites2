import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { unified } from '@astrojs/markdown-remark';
import rehypeExternalLinks from 'rehype-external-links';

const here = (path) => fileURLToPath(new URL(path, import.meta.url));

// Gives every blockquote the production Card recipe classes (they are emitted by
// Panda's staticCss), so the callout matches the Next.js version's card.
const rehypeCallout = () => (tree) => {
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'blockquote') {
      node.properties = {
        ...node.properties,
        className: [
          'verdant-card__root',
          'verdant-card__root--variant_outline',
          'md-callout',
        ],
      };
    }
    node.children?.forEach(walk);
  };
  walk(tree);
};

// ADR-0006 spike. React, Ark UI and the app's components resolve from the repo
// root, so the existing code is reused unchanged. The only Next.js-specific
// import in that code is next/image, shimmed below.
export default defineConfig({
  output: 'static',
  integrations: [react()],
  // Astro 7: plugins go on the unified processor; the built-in default
  // processor does not run rehype plugins.
  markdown: {
    processor: unified({
      // Astro turns straight quotes into curly ones by default, which would
      // change the copy; keep the text exactly as written.
      smartypants: false,
      rehypePlugins: [
        rehypeCallout,
        [
          rehypeExternalLinks,
          { target: '_blank', rel: ['noopener', 'noreferrer'] },
        ],
      ],
    }),
  },
  vite: {
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: [
        { find: '@/styled-system', replacement: here('./styled-system') },
        { find: '@/components', replacement: here('../../app/components') },
        { find: '@/lib', replacement: here('../../app/lib') },
        { find: '@/types', replacement: here('../../app/types') },
        {
          find: '@/SW_logo_431x431.gif',
          replacement: here('../../SW_logo_431x431.gif'),
        },
        { find: 'next/image', replacement: here('./src/shims/next-image.tsx') },
      ],
    },
  },
});
