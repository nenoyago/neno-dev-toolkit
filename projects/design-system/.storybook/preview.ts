import '../src/styles/index.css';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import type { Preview } from '@storybook/angular';

import { initDefaultThemeCss } from '../core/theme/theme-style-injector';
import docJson from '../documentation.json';

setCompodocJson(docJson);

initDefaultThemeCss();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
