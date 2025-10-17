import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { ANALYTICS_CONFIG } from '../analytics.config';

/**
 * @description
 * A service responsible for sending various analytics and tracking events
 * to the Kibana backend endpoints.
 */
@Injectable({
  providedIn: 'root'
})
export class KibanaHttpService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(ANALYTICS_CONFIG);

  private readonly baseUrl: string;
  private readonly BASE_PATH = '/Kibana';

  constructor() {
    this.baseUrl = this.normalizeBaseUrl(this.config.baseUrl);
  }

  private normalizeBaseUrl(url: string) {
    return url.endsWith('/') ? url.slice(0, -1) : url;
  }

  // --- Generic Event ---
  logGenericEvent(payload: Record<string, any>): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}${this.BASE_PATH}/LIVAnalytics/SaveEvent`,
      payload
    );
  }
}
