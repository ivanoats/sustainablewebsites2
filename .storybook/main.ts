const fromRoot = (subPath: string) =>
  new URL(`../${subPath}`, import.meta.url).pathname;

type RollupWarning = {
  code?: string;
  message?: string;
};

type WarnHandler = (warning: unknown) => void;

type StorybookViteConfig = {
  resolve?: {
    alias?: Record<string, string>;
  };
  build?: {
    chunkSizeWarningLimit?: number;
    rollupOptions?: {
      onwarn?: (warning: RollupWarning, warn: WarnHandler) => void;
    };
  };
};

const config = {
  stories: ['../app/**/*.stories.{js,jsx,ts,tsx}'],
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook'],
  framework: '@storybook/react-vite',
  viteFinal: (config: StorybookViteConfig) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@/components': fromRoot('app/components'),
      '@/types': fromRoot('app/types'),
      '@/lib': fromRoot('app/lib'),
      '@/styled-system': fromRoot('styled-system'),
      '@': fromRoot(''),
    };

    config.build ??= {};
    config.build.chunkSizeWarningLimit = 1200;

    config.build.rollupOptions ??= {};
    const previousOnWarn = config.build.rollupOptions.onwarn;
    config.build.rollupOptions.onwarn = (warning, warn) => {
      if (
        warning.code === 'MODULE_LEVEL_DIRECTIVE' ||
        warning.code === 'EVAL'
      ) {
        return;
      }

      if (warning.message?.includes('Use of eval in')) {
        return;
      }

      previousOnWarn?.(warning, warn);
    };

    return config;
  },
};

export default config;
