import { InjectionToken } from '@angular/core';

export interface HttpConnectConfig {
  /**
   * A URL base para todas as chamadas de API.
   * Ex: 'https://api.meusite.com/v1'
   */
  baseUrl: string;

  /**
   * O tempo de vida (TTL) padrão do cache em milissegundos para requisições GET.
   * Se não for fornecido ou for 0, o cache estará desabilitado por padrão.
   * @default 0
   */
  cacheTtl?: number;

  /**
   * O número máximo de respostas de requisições que serão armazenadas em cache.
   * Quando o cache atinge esse limite, o item menos recentemente usado é removido
   * para dar lugar a um novo.
   * @default 100
   */
  cacheMaxSize?: number;
}

export const HTTP_CONNECT_CONFIG = new InjectionToken<HttpConnectConfig>(
  'HTTP_CONNECT_CONFIG'
);
