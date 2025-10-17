import { InjectionToken } from '@angular/core';

/**
 * Configuration options for analytics tracking.
 */
export interface AnalyticsConfig {
  /**
   * The base URL for the analytics backend service.
   */
  baseUrl: string;
  /**
   * Optional list of HTML tag names considered interactive for tracking.
   */
  tagNames?: string[];
}

/**
 * Injection token for providing the analytics configuration.
 */
export const ANALYTICS_CONFIG = new InjectionToken<AnalyticsConfig>(
  'ANALYTICS_CONFIG'
);
