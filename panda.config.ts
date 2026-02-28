import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: [
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  exclude: [],
  theme: {
    extend: {
      tokens: {
        colors: {
          primary: { value: '#10b981' },
          secondary: { value: '#059669' },
          accent: { value: '#f59e0b' },
          neutral: { value: '#6b7280' },
        },
        spacing: {
          xs: { value: '0.5rem' },
          sm: { value: '1rem' },
          md: { value: '1.5rem' },
          lg: { value: '2rem' },
          xl: { value: '3rem' },
          '2xl': { value: '4rem' },
        },
        fontSizes: {
          xs: { value: '0.75rem' },
          sm: { value: '0.875rem' },
          base: { value: '1rem' },
          lg: { value: '1.125rem' },
          xl: { value: '1.25rem' },
          '2xl': { value: '1.5rem' },
          '3xl': { value: '1.875rem' },
          '4xl': { value: '2.25rem' },
        },
      },
    },
  },
  jsxFramework: 'react',
  outdir: 'styled-system',
});
