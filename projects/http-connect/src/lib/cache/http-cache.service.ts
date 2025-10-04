import { HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { HTTP_CONNECT_CONFIG } from '../http-connect.config';
import { CacheEntry } from './cache.model';

const CACHE_MAX_SIZE_DEFAULT = 100;

@Injectable({ providedIn: 'root' })
export class HttpCacheService {
  private cache = new Map<string, CacheEntry>();
  private config = inject(HTTP_CONNECT_CONFIG, { optional: true });
  private maxSize: number;

  constructor() {
    this.maxSize = this.config?.cacheMaxSize ?? CACHE_MAX_SIZE_DEFAULT;
  }

  /**
   * Obtém uma resposta do cache, se ela existir e não estiver expirada.
   * Implementa a política LRU movendo o item acessado para o final do Map.
   */
  get(key: string): HttpResponse<any> | undefined {
    const entry = this.cache.get(key);

    if (!entry) {
      return undefined;
    }

    // Verifica se a entrada do cache expirou
    const isExpired = Date.now() > entry.expiry;
    if (isExpired) {
      this.cache.delete(key); // Remove a entrada expirada
      return undefined;
    }

    // Para a política LRU, movemos o item para o final do Map
    // ao acessá-lo, deletando e setando novamente.
    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.response;
  }

  /**
   * Adiciona uma resposta ao cache com um tempo de vida (TTL) e gerencia o tamanho do cache.
   */
  put(key: string, response: HttpResponse<any>, ttl: number): void {
    const expiry = Date.now() + ttl;
    const newEntry = { response, expiry };

    // Se o cache estiver cheio e a chave for nova, remove o item mais antigo (o primeiro)
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

    // Remove a chave existente para garantir que a nova entrada vá para o final (atualização)
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, newEntry);
  }

  /**
   * Invalida uma entrada de cache específica.
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Limpa todo o cache.
   */
  invalidateAll(): void {
    this.cache.clear();
  }
}
