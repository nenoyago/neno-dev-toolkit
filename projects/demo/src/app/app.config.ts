import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { DEFAULT_THEME, provideTheme } from '@neno-liv/design-system';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    ...provideTheme({
      colors: {
        ...DEFAULT_THEME.colors,
        'brand-primary-pure': 'red',
        'brand-primary-light': '#ffcccc',
      },
    }),
  ],
};
