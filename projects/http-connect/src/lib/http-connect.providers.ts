import { HttpInterceptorFn } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { cachingInterceptor } from './cache/caching.interceptor';
import { HttpConnectConfig, HTTP_CONNECT_CONFIG } from './http-connect.config';
import { responseUnwrappingInterceptor } from './interceptors/response-unwrapping.interceptor';

/**
 * Retorna os interceptores essenciais para o funcionamento do HttpConnect.
 * Deve ser usado dentro de `provideHttpClient(withInterceptors([...]))`.
 * @returns Um array de `HttpInterceptorFn`.
 */
export function withHttpConnectInterceptors(): HttpInterceptorFn[] {
  return [responseUnwrappingInterceptor, cachingInterceptor];
}

/**
 * Fornece a configuração para o HttpConnectService.
 * @param config A configuração necessária, como `baseUrl`.
 * @returns Um `EnvironmentProviders`.
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
