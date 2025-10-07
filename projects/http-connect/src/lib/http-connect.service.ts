/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { joinUrl } from './utils/url.utils';

/**
 * Extended HTTP request options for the HttpConnect library.
 * Extends Angular's standard HttpClient options with caching and response unwrapping capabilities.
 */
export interface RequestOptions {
  /** HTTP headers to send with the request. */
  headers?: HttpHeaders | { [header: string]: string | string[] };
  /** Specifies what to observe in the response. */
  observe?: 'body';
  /** HTTP query parameters. */
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  /** Whether to report progress events. */
  reportProgress?: boolean;
  /** Expected response type. */
  responseType?: 'json';
  /** Whether to include credentials with the request. */
  withCredentials?: boolean;
  /**
   * Overrides the global cache TTL for this specific GET request (in milliseconds).
   * Set to 0 to disable caching for this call.
   */
  cacheTtl?: number;
  /**
   * Defines the key to extract from the response (e.g., 'data') or `false` to disable unwrapping.
   */
  unwrapResponseKey?: string | false;
}

/**
 * HTTP service with built-in caching and response unwrapping capabilities.
 * Provides a simplified API for making HTTP requests with automatic configuration
 * of base URL, caching, and response transformation.
 *
 * @example
 * ```typescript
 * // In a service
 * export class UserService {
 *   private http = inject(HttpConnectService);
 *
 *   getUsers() {
 *     return this.http.get<User[]>('/users');
 *   }
 *
 *   getUserById(id: string) {
 *     return this.http.get<User>(`/users/${id}`, {
 *       cacheTtl: 300000 // Cache for 5 minutes
 *     });
 *   }
 * }
 * ```
 */
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
   * Configures the HTTP context for a request based on options and global configuration.
   *
   * @param options - The request options.
   * @returns A tuple containing the configured HttpContext and the remaining HTTP options.
   */
  private setContext(
    options: RequestOptions
  ): [HttpContext, Omit<RequestOptions, 'cacheTtl' | 'unwrapResponseKey'>] {
    const { cacheTtl, unwrapResponseKey, ...httpOptions } = options;
    let context = new HttpContext();

    // Set cache TTL
    const effectiveTtl = cacheTtl ?? this.config.cacheTtl;
    if (effectiveTtl !== undefined) {
      context = context.set(CACHE_TTL_MS, effectiveTtl);
    }

    // Set response unwrapping key
    const key = unwrapResponseKey ?? this.config.unwrapResponseKey ?? 'data';
    context = context.set(UNWRAP_RESPONSE_KEY, key);

    return [context, httpOptions];
  }

  /**
   * Performs a GET request.
   *
   * @param endpoint - The endpoint path (e.g., '/users').
   * @param options - Optional request configuration.
   * @returns An Observable of the response body.
   *
   * @example
   * ```typescript
   * this.http.get<User[]>('/users', {
   *   cacheTtl: 60000, // Cache for 1 minute
   *   params: { page: '1', limit: '10' }
   * });
   * ```
   */
  public get<T>(endpoint: string, options: RequestOptions = {}): Observable<T> {
    const [context, httpOptions] = this.setContext(options);
    return this.httpClient.get<T>(
      joinUrl(joinUrl(`${this.baseUrl}${endpoint}`)),
      {
        ...httpOptions,
        context
      }
    );
  }

  /**
   * Performs a POST request.
   *
   * @param endpoint - The endpoint path.
   * @param body - The request body.
   * @param options - Optional request configuration.
   * @returns An Observable of the response body.
   */
  public post<T>(
    endpoint: string,
    body: any,
    options: RequestOptions = {}
  ): Observable<T> {
    const [context, httpOptions] = this.setContext(options);
    return this.httpClient.post<T>(
      joinUrl(`${this.baseUrl}${endpoint}`),
      body,
      {
        ...httpOptions,
        context
      }
    );
  }

  /**
   * Performs a PUT request.
   *
   * @param endpoint - The endpoint path.
   * @param body - The request body.
   * @param options - Optional request configuration.
   * @returns An Observable of the response body.
   */
  public put<T>(
    endpoint: string,
    body: any,
    options: RequestOptions = {}
  ): Observable<T> {
    const [context, httpOptions] = this.setContext(options);
    return this.httpClient.put<T>(joinUrl(`${this.baseUrl}${endpoint}`), body, {
      ...httpOptions,
      context
    });
  }

  /**
   * Performs a PATCH request.
   *
   * @param endpoint - The endpoint path.
   * @param body - The request body.
   * @param options - Optional request configuration.
   * @returns An Observable of the response body.
   */
  public patch<T>(
    endpoint: string,
    body: any,
    options: RequestOptions = {}
  ): Observable<T> {
    const [context, httpOptions] = this.setContext(options);
    return this.httpClient.patch<T>(
      joinUrl(`${this.baseUrl}${endpoint}`),
      body,
      {
        ...httpOptions,
        context
      }
    );
  }

  /**
   * Performs a DELETE request.
   *
   * @param endpoint - The endpoint path.
   * @param options - Optional request configuration.
   * @returns An Observable of the response body.
   */
  public delete<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Observable<T> {
    const [context, httpOptions] = this.setContext(options);
    return this.httpClient.delete<T>(joinUrl(`${this.baseUrl}${endpoint}`), {
      ...httpOptions,
      context
    });
  }
}
