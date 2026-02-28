import type { StorybookConfig } from '@storybook/react/types';

const config: StorybookConfig = {
  stories: ['../app/**/*.stories.{js,jsx,ts,tsx}'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react',
    options: {
      builder: {
        name: '@storybook/builder-vite',
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
