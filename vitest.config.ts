import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    // Keep Vitest defaults (e.g. node_modules/.git) and add Playwright e2e specs.
    exclude: [...configDefaults.exclude, 'e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'styled-system/', '.storybook/', 'dist/'],
    },
  },
  resolve: {
    alias: {
      '@/components/ui': path.resolve(
        __dirname,
        './app/components/__mocks__/ui.ts'
      ),
      '@/components': path.resolve(__dirname, './app/components'),
      '@/lib': path.resolve(__dirname, './app/lib'),
      '@/types': path.resolve(__dirname, './app/types'),
      '@/styled-system': path.resolve(__dirname, './styled-system'),
      'styled-system': path.resolve(__dirname, './styled-system'),
      '@': path.resolve(__dirname, './'),
    },
  },
});
