import {
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { cachingInterceptor } from './cache/caching.interceptor';
import { HttpConnectConfig, HTTP_CONNECT_CONFIG } from './http-connect.config';
import { responseUnwrappingInterceptor } from './interceptors/response-unwrapping.interceptor';

export function provideHttpConnect(
  config: HttpConnectConfig,
  withExtraInterceptors: HttpInterceptorFn[] = []
): EnvironmentProviders {
  const internalInterceptors = [
    responseUnwrappingInterceptor,
    cachingInterceptor
  ];

  return makeEnvironmentProviders([
    provideHttpClient(
      withInterceptors([...internalInterceptors, ...withExtraInterceptors])
    ),
    {
      provide: HTTP_CONNECT_CONFIG,
      useValue: config
    }
  ]);
}
