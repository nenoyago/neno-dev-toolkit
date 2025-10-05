import { InjectionToken } from '@angular/core';

/**
 * Configuration interface for the HttpConnect library.
 */
export interface HttpConnectConfig {
  /**
   * The base URL for all API calls.
   *
   * @example
   * ```typescript
   * baseUrl: 'https://api.example.com/v1'
   * ```
   */
  baseUrl: string;

  /**
   * Default cache Time-To-Live (TTL) in milliseconds for GET requests.
   * If not provided or set to 0, caching will be disabled by default.
   *
   * @default 0
   */
  cacheTtl?: number;

  /**
   * Maximum number of request responses to store in cache.
   * When the cache reaches this limit, the least recently used item is removed
   * to make room for a new one.
   *
   * @default 100
   */
  cacheMaxSize?: number;

  /**
   * Defines the property key to be extracted from the response body (e.g., 'data', 'result').
   * Set to `false` to disable unwrapping.
   *
   * @default 'data'
   *
   * @example
   * ```typescript
   * // For responses like { data: {...} }
   * unwrapResponseKey: 'data'
   *
   * // For responses like { result: {...} }
   * unwrapResponseKey: 'result'
   *
   * // To disable unwrapping
   * unwrapResponseKey: false
   * ```
   */
  unwrapResponseKey?: string | false;
}

/**
 * Injection token for the HttpConnect configuration.
 */
export const HTTP_CONNECT_CONFIG = new InjectionToken<HttpConnectConfig>(
  'HTTP_CONNECT_CONFIG'
);
