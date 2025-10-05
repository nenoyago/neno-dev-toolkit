import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { cachingInterceptor } from './cache/caching.interceptor';
import { HttpConnectConfig, HTTP_CONNECT_CONFIG } from './http-connect.config';
import { responseUnwrappingInterceptor } from './interceptors/response-unwrapping.interceptor';

/**
 * Provides the HttpConnect configuration
 *
 * @param config - The HttpConnect configuration object containing baseUrl, cacheTtl, etc.
 * @returns An EnvironmentProviders instance to be used in the application configuration.
 *
 * @example
 * ```typescript
 * // In app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpConnect(
 *       { baseUrl: 'https://api.example.com' },
 *     )
 *   ]
 * };
 * ```
 */
export function provideHttpConnect(
  config: HttpConnectConfig
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: HTTP_CONNECT_CONFIG,
      useValue: config
    }
  ]);
}

/**
 * Re-exported interceptors for individual registration if needed.
 * Useful when using `withInterceptorsFromDi()` or custom interceptor registration.
 */
export { responseUnwrappingInterceptor, cachingInterceptor };
