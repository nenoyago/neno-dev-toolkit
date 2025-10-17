import { makeEnvironmentProviders } from '@angular/core';

import { ANALYTICS_CONFIG, AnalyticsConfig } from './analytics.config';
import { defaultTagNames } from './analytics.constants';

export function provideAnalytics(config: AnalyticsConfig) {
  return makeEnvironmentProviders([
    {
      provide: ANALYTICS_CONFIG,
      useValue: {
        ...config,
        tagNames: config.tagNames ?? defaultTagNames
      }
    }
  ]);
}
