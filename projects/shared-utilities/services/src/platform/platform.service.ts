import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  readonly platform = inject(PLATFORM_ID);

  readonly isPlatformServer = isPlatformBrowser(this.platform);
  readonly isPlatformBrowser = isPlatformBrowser(this.platform);
}
