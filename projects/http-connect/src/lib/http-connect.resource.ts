import { EnvironmentInjector, Injector, inject } from '@angular/core';

import { HTTP_CONNECT_CONFIG, HttpConnectConfig } from './http-connect.config';
import { HttpConnectService } from './http-connect.service';

/**
 * Options for creating an HTTP resource instance.
 */
interface CreateHttpResourceOptions {
  /**
   * If `true`, extends the parent's baseUrl by appending the provided path.
   * If `false` or not provided, uses the path as the new baseUrl.
   *
   * @default false
   */
  extend?: boolean;
  /**
   * Overrides the cache TTL for this resource instance.
   */
  cacheTtl?: number;
}

/**
 * Creates a new instance of HttpConnectService with a custom configuration.
 * Useful for creating sub-resources or connecting to different API endpoints.
 *
 * @param path - The path or full URL for this resource.
 * @param options - Optional configuration for the resource.
 * @returns A new HttpConnectService instance with its own configuration.
 *
 * @example
 * ```typescript
 * // Create a resource that extends the parent baseUrl
 * const usersApi = createHttpResource('users', { extend: true });
 * usersApi.get('/'); // Calls: <parentBaseUrl>/users/
 *
 * // Create a resource for a different API
 * const externalApi = createHttpResource('https://api.external.com');
 * externalApi.get('/data'); // Calls: https://api.external.com/data
 *
 * // With custom cache TTL
 * const productsApi = createHttpResource('products', {
 *   extend: true,
 *   cacheTtl: 300000 // 5 minutes
 * });
 * ```
 */
export function createHttpResource(
  path: string,
  options: CreateHttpResourceOptions = {}
): HttpConnectService {
  const parentInjector = inject(EnvironmentInjector);
  const parentConfig = inject(HTTP_CONNECT_CONFIG, { optional: true });

  const { extend = false, cacheTtl } = options;

  const newConfig: HttpConnectConfig = {
    baseUrl: extend && parentConfig ? `${parentConfig.baseUrl}/${path}` : path,
    cacheTtl: cacheTtl ?? parentConfig?.cacheTtl
  };

  return Injector.create({
    providers: [
      { provide: HTTP_CONNECT_CONFIG, useValue: newConfig },
      { provide: HttpConnectService, useClass: HttpConnectService }
    ],
    parent: parentInjector
  }).get(HttpConnectService);
}
