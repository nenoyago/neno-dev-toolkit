import { HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { HTTP_CONNECT_CONFIG } from '../http-connect.config';
import { CacheEntry } from './cache.model';

const CACHE_MAX_SIZE_DEFAULT = 100;

/**
 * Service for caching HTTP responses with LRU (Least Recently Used) eviction policy.
 * Automatically manages cache size and removes expired entries.
 *
 * @example
 * This service is used internally by the `cachingInterceptor`.
 * You can also use it directly for manual cache management:
 *
 * ```typescript
 * export class MyService {
 *   private cacheService = inject(HttpCacheService);
 *
 *   clearCache() {
 *     this.cacheService.invalidateAll();
 *   }
 *
 *   clearSpecificEntry(url: string) {
 *     this.cacheService.invalidate(url);
 *   }
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class HttpCacheService {
  private cache = new Map<string, CacheEntry>();
  private config = inject(HTTP_CONNECT_CONFIG, { optional: true });
  private maxSize: number;

  constructor() {
    this.maxSize = this.config?.cacheMaxSize ?? CACHE_MAX_SIZE_DEFAULT;
  }

  /**
   * Retrieves a cached response if it exists and hasn't expired.
   * Implements LRU policy by moving accessed items to the end of the Map.
   *
   * @param key - The cache key (typically the request URL with parameters).
   * @returns The cached HttpResponse or undefined if not found or expired.
   */
  get(key: string): HttpResponse<any> | undefined {
    const entry = this.cache.get(key);

    if (!entry) {
      return undefined;
    }

    // Check if the cache entry has expired
    const isExpired = Date.now() > entry.expiry;
    if (isExpired) {
      this.cache.delete(key);
      return undefined;
    }

    // For LRU policy, move the item to the end of the Map
    // by deleting and re-setting it
    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.response;
  }

  /**
   * Adds a response to the cache with a Time-To-Live (TTL) and manages cache size.
   * If the cache is full, removes the oldest (least recently used) entry.
   *
   * @param key - The cache key (typically the request URL with parameters).
   * @param response - The HTTP response to cache.
   * @param ttl - Time-To-Live in milliseconds.
   */
  put(key: string, response: HttpResponse<any>, ttl: number): void {
    const expiry = Date.now() + ttl;
    const newEntry = { response, expiry };

    // If cache is full and the key is new, remove the oldest item (the first one)
    if (
      this.maxSize > 0 &&
      this.cache.size >= this.maxSize &&
      !this.cache.has(key)
    ) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    // Remove existing key to ensure the new entry goes to the end (update operation)
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, newEntry);
  }

  /**
   * Invalidates a specific cache entry.
   *
   * @param key - The cache key to invalidate.
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clears all cached entries.
   */
  invalidateAll(): void {
    this.cache.clear();
  }
}
