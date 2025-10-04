import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CACHE_TTL_MS } from './context/request-config.context';
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
}

// Interface para o corpo da resposta esperada da sua API
interface ApiResponse<T> {
  data: T;
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

  /**
   * Realiza uma requisição GET.
   * @param endpoint O caminho do recurso. Ex: '/users'
   * @param options Opções da requisição, incluindo o `cacheTtl`.
   */
  public get<T>(endpoint: string, options: RequestOptions = {}): Observable<T> {
    const { cacheTtl, ...httpOptions } = options;
    let context = new HttpContext();

    if (cacheTtl !== undefined) {
      context = context.set(CACHE_TTL_MS, cacheTtl);
    }

    return this.httpClient
      .get<
        ApiResponse<T>
      >(`${this.baseUrl}${endpoint}`, { ...httpOptions, context })
      .pipe(map((res) => res.data));
  }

  /**
   * Realiza uma requisição POST.
   */
  public post<T>(
    endpoint: string,
    body: any,
    options: RequestOptions = {}
  ): Observable<T> {
    return this.httpClient
      .post<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, body, options)
      .pipe(map((res) => res.data));
  }

  /**
   * Realiza uma requisição PUT.
   */
  public put<T>(
    endpoint: string,
    body: any,
    options: RequestOptions = {}
  ): Observable<T> {
    return this.httpClient
      .put<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, body, options)
      .pipe(map((res) => res.data));
  }

  /**
   * Realiza uma requisição PATCH.
   */
  public patch<T>(
    endpoint: string,
    body: any,
    options: RequestOptions = {}
  ): Observable<T> {
    return this.httpClient
      .patch<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, body, options)
      .pipe(map((res) => res.data));
  }

  /**
   * Realiza uma requisição DELETE.
   */
  public delete<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Observable<T> {
    return this.httpClient
      .delete<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, options)
      .pipe(map((res) => res.data));
  }
}
