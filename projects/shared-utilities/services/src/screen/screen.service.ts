import { Injectable } from '@angular/core';

import { Observable, fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

const MOBILE_WIDTH_SIZE = 1024;

type ResizeProps = {
  breakpoint?: number;
  debounce?: number;
};

@Injectable({ providedIn: 'root' })
export class ScreenService {
  private resizeObservable$: Observable<Event> | undefined;

  get isMobileWidthSize(): boolean {
    return window.innerWidth <= MOBILE_WIDTH_SIZE;
  }

  isMobileDevice(breakpoint = MOBILE_WIDTH_SIZE): boolean {
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const noHoverSupport = !window.matchMedia('(hover: hover)').matches;

    return window.innerWidth < breakpoint || hasCoarsePointer || noHoverSupport;
  }

  onResize$(
    { breakpoint = MOBILE_WIDTH_SIZE, debounce = 75 }: ResizeProps = {
      breakpoint: MOBILE_WIDTH_SIZE,
      debounce: 75
    }
  ) {
    this.resizeObservable$ = fromEvent(window, 'resize');

    return this.resizeObservable$.pipe(
      debounceTime(debounce),
      map(({ target }) => {
        const { innerWidth } = target as Window;

        return {
          width: innerWidth,
          isMobile: innerWidth <= breakpoint
        };
      })
    );
  }
}
