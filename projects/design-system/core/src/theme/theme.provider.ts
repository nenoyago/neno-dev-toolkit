import {
  inject,
  makeEnvironmentProviders,
  provideAppInitializer
} from '@angular/core';

import { provideIcons } from '@ng-icons/core';
import * as heroIcons from '@ng-icons/heroicons/outline';
import * as lucideIcons from '@ng-icons/lucide';

import { DEFAULT_THEME } from './default-theme';
import { ThemeConfig } from './theme-config';
import { injectThemeCss } from './theme-style-injector';
import { THEME_CONFIG } from './theme.token';

export function provideTheme(config?: ThemeConfig) {
  const theme = { ...DEFAULT_THEME, ...config };

  return makeEnvironmentProviders([
    {
      provide: THEME_CONFIG,
      useValue: theme
    },
    provideAppInitializer(() => {
      const theme = inject(THEME_CONFIG, { optional: true }) ?? DEFAULT_THEME;
      return Promise.resolve(injectThemeCss(theme));
    }),
    provideIcons({
      ...heroIcons,
      ...lucideIcons
    })
  ]);
}
