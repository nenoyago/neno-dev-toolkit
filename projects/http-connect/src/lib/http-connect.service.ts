import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { CACHE_TTL_MS } from './context/request-config.context';
import { UNWRAP_RESPONSE_KEY } from './context/unwrap-response.context';
import { HTTP_CONNECT_CONFIG } from './http-connect.config';

// Interface para as opções de requisição, estendendo as opções do Angular
export interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  /**
   * Sobrescreve o TTL de cache global para esta requisição GET específica (em milissegundos).
   * Defina como 0 para desativar o cache para esta chamada.
   */
  cacheTtl?: number;
  /**
   * Define a chave a ser extraída da resposta (ex: 'data') ou `false` para desativar.
   */
  unwrapResponseKey?: string | false;
}

@Injectable({ providedIn: 'root' })
export class HttpConnectService {
  private httpClient = inject(HttpClient);
  private config = inject(HTTP_CONNECT_CONFIG);
  private baseUrl: string;

  constructor() {
    this.baseUrl = this.config.baseUrl.endsWith('/')
      ? this.config.baseUrl.slice(0, -1)
      : this.config.baseUrl;
  }

  private setContext(
    options: RequestOptions
  ): [HttpContext, Omit<RequestOptions, 'cacheTtl' | 'unwrapResponseKey'>] {
    const { cacheTtl, unwrapResponseKey, ...httpOptions } = options;
    let context = new HttpContext();

    // Define o TTL para o cache
    const effectiveTtl = cacheTtl ?? this.config.cacheTtl;
    if (effectiveTtl !== undefined) {
      context = context.set(CACHE_TTL_MS, effectiveTtl);
    }

    // Define a chave de desembrulho da resposta
    const key = unwrapResponseKey ?? this.config.unwrapResponseKey ?? 'data';
    context = context.set(UNWRAP_RESPONSE_KEY, key);

    return [context, httpOptions];
  }

  /**
   * Realiza uma requisição GET.
   */
  public get<T>(endpoint: string, options: RequestOptions = {}): Observable<T> {
    const [context, httpOptions] = this.setContext(options);
    return this.httpClient.get<T>(`${this.baseUrl}${endpoint}`, {
      ...httpOptions,
      context
    });
  }

  /**
   * Realiza uma requisição POST.
   */
  public post<T>(
    endpoint: string,
    body: any,
    options: RequestOptions = {}
  ): Observable<T> {
    const [context, httpOptions] = this.setContext(options);
    return this.httpClient.post<T>(`${this.baseUrl}${endpoint}`, body, {
      ...httpOptions,
      context
    });
  }

  /**
   * Realiza uma requisição PUT.
   */
  public put<T>(
    endpoint: string,
    body: any,
    options: RequestOptions = {}
  ): Observable<T> {
    const [context, httpOptions] = this.setContext(options);
    return this.httpClient.put<T>(`${this.baseUrl}${endpoint}`, body, {
      ...httpOptions,
      context
    });
  }

  /**
   * Realiza uma requisição PATCH.
   */
  public patch<T>(
    endpoint: string,
    body: any,
    options: RequestOptions = {}
  ): Observable<T> {
    const [context, httpOptions] = this.setContext(options);
    return this.httpClient.patch<T>(`${this.baseUrl}${endpoint}`, body, {
      ...httpOptions,
      context
    });
  }

  /**
   * Realiza uma requisição DELETE.
   */
  public delete<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Observable<T> {
    const [context, httpOptions] = this.setContext(options);
    return this.httpClient.delete<T>(`${this.baseUrl}${endpoint}`, {
      ...httpOptions,
      context
    });
  }
}
