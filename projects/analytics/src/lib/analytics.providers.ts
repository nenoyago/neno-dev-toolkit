import { makeEnvironmentProviders } from '@angular/core';

import { ANALYTICS_CONFIG, AnalyticsConfig } from './analytics.config';
import { defaultTagNames } from './analytics.constants';

/**
 * Provides the analytics configuration to the Angular dependency injection system.
 * Ensures that default tag names are set if not provided in the config.
 *
 * @param config The analytics configuration object.
 * @returns An environment provider for analytics configuration.
 */
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
