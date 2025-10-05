import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';

import { of, tap } from 'rxjs';

import { HttpCacheService } from './http-cache.service';
import { CACHE_TTL_MS } from '../context/request-config.context';

/**
 * HTTP interceptor that provides caching functionality for GET requests.
 * Caches responses based on the TTL specified in the request context.
 * Only caches GET requests with a valid TTL.
 *
 * @example
 * The interceptor is automatically registered when using `provideHttpConnect`.
 * Cache behavior is controlled via the `cacheTtl` option in request options or global config.
 */
export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(HttpCacheService);
  const ttl = req.context.get(CACHE_TTL_MS);

  // Continue without caching if not a GET request or if TTL is not defined/zero
  if (req.method !== 'GET' || !ttl) {
    return next(req);
  }

  // Try to get from cache
  const cachedResponse = cacheService.get(req.urlWithParams);
  if (cachedResponse) {
    return of(cachedResponse.clone());
  }

  // If not in cache, make the request and store the response
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cacheService.put(req.urlWithParams, event.clone(), ttl);
      }
    })
  );
};
