import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { UNWRAP_RESPONSE_KEY } from '../context/unwrap-response.context';

/**
 * Interceptor that unwraps a specified key from the response body if the
 * `UNWRAP_RESPONSE_KEY` context token is set to a string key.
 */
export const responseUnwrappingInterceptor: HttpInterceptorFn = (req, next) => {
  const unwrapKey = req.context.get(UNWRAP_RESPONSE_KEY);

  if (!unwrapKey) {
    return next(req);
  }

  return next(req).pipe(
    map((event) => {
      if (event instanceof HttpResponse) {
        const body = event.body;
        if (body && typeof body === 'object' && unwrapKey in body) {
          // Type assertion to allow dynamic key access
          return event.clone({ body: (body as any)[unwrapKey] });
        }
      }
      return event;
    })
  );
};
