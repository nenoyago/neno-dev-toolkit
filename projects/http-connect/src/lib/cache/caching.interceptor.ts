// projects/http-connect-lib/src/lib/cache/caching.interceptor.ts

import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';

import { of, tap } from 'rxjs';

import { HttpCacheService } from './http-cache.service';
import { CACHE_TTL_MS } from '../context/request-config.context';
import { HTTP_CONNECT_CONFIG } from '../http-connect.config';

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(HttpCacheService);
  const globalConfig = inject(HTTP_CONNECT_CONFIG);

  // 1. Determina o TTL para esta requisição
  const perRequestTtl = req.context.get(CACHE_TTL_MS);
  const globalTtl = globalConfig.cacheTtl ?? 0;
  const effectiveTtl = perRequestTtl ?? globalTtl;

  // 2. Continua sem cache se não for GET ou se o TTL for 0
  if (req.method !== 'GET' || effectiveTtl === 0) {
    return next(req);
  }

  // 3. Tenta obter do cache
  const cachedResponse = cacheService.get(req.urlWithParams);
  if (cachedResponse) {
    return of(cachedResponse.clone());
  }

  // 4. Se não estiver no cache, faz a requisição e armazena a resposta
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cacheService.put(req.urlWithParams, event.clone(), effectiveTtl);
      }
    })
  );
};
