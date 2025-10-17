import { InjectionToken } from '@angular/core';

export interface AnalyticsConfig {
  url: string;
  tagNames?: string[];
}

export const ANALYTICS_CONFIG = new InjectionToken<AnalyticsConfig>(
  'ANALYTICS_CONFIG'
);
