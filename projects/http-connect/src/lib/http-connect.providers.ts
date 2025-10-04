import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { cachingInterceptor } from './cache/caching.interceptor';
import { HttpConnectConfig, HTTP_CONNECT_CONFIG } from './http-connect.config';

export function provideHttpConnect(
  config: HttpConnectConfig
): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(withInterceptors([cachingInterceptor])),
    {
      provide: HTTP_CONNECT_CONFIG,
      useValue: config
    }
  ]);
}
