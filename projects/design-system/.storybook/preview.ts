import { provideAnimations } from '@angular/platform-browser/animations';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import { applicationConfig, type Preview } from '@storybook/angular';

import { provideTheme } from '../core/src/theme/theme.provider';
import docJson from '../documentation.json';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), provideTheme()]
    })
  ]
};

export default preview;
