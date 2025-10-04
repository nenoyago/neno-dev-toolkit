import { EnvironmentInjector, Injector, inject } from '@angular/core';

import { HTTP_CONNECT_CONFIG, HttpConnectConfig } from './http-connect.config';
import { HttpConnectService } from './http-connect.service';

interface CreateHttpResourceOptions {
  extend?: boolean;
  cacheTtl?: number;
}

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
