import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';

import { of, tap } from 'rxjs';

import { HttpCacheService } from './http-cache.service';
import { CACHE_TTL_MS } from '../context/request-config.context';

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(HttpCacheService);
  const ttl = req.context.get(CACHE_TTL_MS);

  // Continua sem cache se não for GET ou se o TTL não for definido ou for 0
  if (req.method !== 'GET' || !ttl) {
    return next(req);
  }

  // Tenta obter do cache
  const cachedResponse = cacheService.get(req.urlWithParams);
  if (cachedResponse) {
    return of(cachedResponse.clone());
  }

  // Se não estiver no cache, faz a requisição e armazena a resposta
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cacheService.put(req.urlWithParams, event.clone(), ttl);
      }
    })
  );
};
