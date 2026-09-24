import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

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
        import.meta.dirname,
        './app/components/__mocks__/ui.ts'
      ),
      '@/components': path.resolve(import.meta.dirname, './app/components'),
      '@/lib': path.resolve(import.meta.dirname, './app/lib'),
      '@/types': path.resolve(import.meta.dirname, './app/types'),
      '@/styled-system': path.resolve(import.meta.dirname, './styled-system'),
      'styled-system': path.resolve(import.meta.dirname, './styled-system'),
      '@': path.resolve(import.meta.dirname, './'),
    },
  },
});
