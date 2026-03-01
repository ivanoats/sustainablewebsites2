const fromRoot = (subPath: string) =>
  new URL(`../${subPath}`, import.meta.url).pathname;

const config = {
  stories: ['../app/**/*.stories.{js,jsx,ts,tsx}'],
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook'],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@/components': fromRoot('app/components'),
      '@/types': fromRoot('app/types'),
      '@/lib': fromRoot('app/lib'),
      '@/styled-system': fromRoot('styled-system'),
      '@': fromRoot(''),
    };

    return config;
  },
  docs: {},
};

export default config;
