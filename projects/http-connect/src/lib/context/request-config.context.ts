import { HttpContextToken } from '@angular/common/http';

/**
 * HTTP context token for specifying a cache Time-To-Live (TTL) in milliseconds
 * for a specific GET request.
 *
 * @example
 * ```typescript
 * const context = new HttpContext().set(CACHE_TTL_MS, 60000); // Cache for 1 minute
 * ```
 */
export const CACHE_TTL_MS = new HttpContextToken<number>(() => 0);
