import { HttpInterceptorFn } from '@angular/common/http';
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
 * Returns the essential interceptors for HttpConnect functionality.
 *
 * This function provides a collection of interceptors that handle response unwrapping
 * and caching. It should be used within `provideHttpClient(withInterceptors([...]))`.
 *
 * @returns An array of `HttpInterceptorFn` containing the response unwrapping and caching interceptors.
 *
 * @example
 * ```typescript
 * // In app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(
 *       withInterceptors([
 *         ...withHttpConnectInterceptors()
 *       ])
 *     ),
 *     provideHttpConnect({ baseUrl: 'https://api.example.com' })
 *   ]
 * };
 * ```
 */
export function withHttpConnectInterceptors(): HttpInterceptorFn[] {
  return [responseUnwrappingInterceptor, cachingInterceptor];
}

/**
 * Re-exported interceptors for individual registration if needed.
 * Useful when using `withInterceptorsFromDi()` or custom interceptor registration.
 */
export { responseUnwrappingInterceptor, cachingInterceptor };
