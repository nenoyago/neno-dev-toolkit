import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../components/src/**/*.mdx',
    '../components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-docs',
    '@chromatic-com/storybook',
    '@storybook/addon-styling-webpack'
  ],
  framework: '@storybook/angular'
};
export default config;
