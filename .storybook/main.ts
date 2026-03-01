import type { StorybookConfig } from '@storybook/react/types';

const config: StorybookConfig = {
  stories: ['../app/**/*.stories.{js,jsx,ts,tsx}'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/react',
    options: {
      builder: {
        name: '@storybook/builder-vite',
      },
    },
  },
  docs: {},
};

export default config;
