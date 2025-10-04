import { HttpContextToken } from '@angular/common/http';

/**
 * Token de contexto HTTP para especificar um tempo de vida de cache (TTL)
 * em milissegundos para uma requisição GET específica.
 */
export const CACHE_TTL_MS = new HttpContextToken<number>(() => 0);
