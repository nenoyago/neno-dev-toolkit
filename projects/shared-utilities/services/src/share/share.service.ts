import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  /** Verifica se o navegador suporta a API de compartilhamento */
  private isSupported(): boolean {
    return !!navigator.share;
  }

  /** Verifica se há permissão concedida ou disponível para a API */
  private async hasPermission(): Promise<boolean> {
    if (!navigator.permissions) {
      return false;
    }

    try {
      const status = await navigator.permissions.query({
        name: 'share' as PermissionName
      });
      return status.state === 'granted' || status.state === 'prompt';
    } catch {
      return true;
    }
  }

  private async shareData(data: ShareData): Promise<void> {
    if (!this.isSupported()) {
      const message = 'API de compartilhamento não suportada.';
      throw new Error(message);
    }
    const allowed = await this.hasPermission();
    if (!allowed) {
      const message =
        'Não foi possível compartilhar. Por favor, tente o botão "Copiar Link"';

      throw new Error(message);
    }
    return navigator.share(data);
  }

  share(data: ShareData): Observable<void> {
    return from(this.shareData(data));
  }
}
