import { HttpResponse } from '@angular/common/http';

export interface CacheEntry {
  response: HttpResponse<any>;
  expiry: number;
}
