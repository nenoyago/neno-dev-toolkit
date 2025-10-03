import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../components/src/**/*.mdx',
    '../components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-styling-webpack'],
  framework: {
    name: '@storybook/angular',
    options: {}
  }
};
export default config;
