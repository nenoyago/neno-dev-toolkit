import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  catchError,
  Observable,
  take,
  tap,
  throwError,
  timer
} from 'rxjs';

type CopyOptions = {
  copyDurationMs?: number;
};

@Injectable()
export class CopyClipboardService {
  private _isCopied = new BehaviorSubject<boolean>(false);
  readonly isCopied$ = this._isCopied.asObservable();

  private showCopiedFeedback(delay = 2000): void {
    this._isCopied.next(true);
    timer(delay)
      .pipe(take(1))
      .subscribe(() => {
        this.resetCopyState();
      });
  }

  resetCopyState(): void {
    this._isCopied.next(false);
  }

  /**
   *
   * @param text  Text to be copied to clipboard
   * @param options Configuration options for copy behavior
   * @returns  An Observable that emits the copied text upon successful copy operation
   */
  copy(
    text: string,
    options: CopyOptions = {
      copyDurationMs: 2000
    }
  ): Observable<string> {
    const { copyDurationMs } = options || {};

    return new Observable<string>((subscriber) => {
      this.copyToClipboard(text)
        .then(() => {
          subscriber.next(text);
          subscriber.complete();
        })
        .catch((err) => subscriber.error(err));
    }).pipe(
      tap(() => this.showCopiedFeedback(copyDurationMs)),
      catchError((err) => {
        console.error('Error in copy operation:', err);
        return throwError(() => err);
      })
    );
  }

  private async copyToClipboard(text: string): Promise<void> {
    if (navigator.clipboard) {
      return navigator.clipboard.writeText(text);
    }

    return Promise.reject(new Error('Clipboard API not available'));
  }
}
