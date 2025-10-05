import { HttpContextToken } from '@angular/common/http';

/**
 * Context token to control how the `responseUnwrappingInterceptor` should
 * process the response. It can hold a string (the key to unwrap) or `false`
 * to disable unwrapping.
 */
export const UNWRAP_RESPONSE_KEY = new HttpContextToken<string | false>(
  () => false
);
