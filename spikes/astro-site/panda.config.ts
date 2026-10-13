import { defineConfig } from '@pandacss/dev';
import base from '../../panda.config';

// Reuse the production theme and recipes; only the scan paths and output differ.
export default defineConfig({
  ...base,
  include: ['../../app/**/*.{ts,tsx}', './src/**/*.{astro,ts,tsx}'],
  outdir: 'styled-system',
});
