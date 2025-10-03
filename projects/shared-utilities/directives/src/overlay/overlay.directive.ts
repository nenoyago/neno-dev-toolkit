import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  booleanAttribute,
  input,
  output
} from '@angular/core';

import { Subscription, fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[livOverlay]',
  standalone: true
})
export class OverlayDirective implements AfterViewInit, OnDestroy {
  readonly activeOverlay = input(false, {
    alias: 'livOverlay',
    transform: booleanAttribute
  });

  readonly clickOutside = output<void>();

  private _documentClickSubscription: Subscription | undefined;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostBinding('class.overlay-panel') overlayPanelClass = true;
  @HostBinding('class.overlay-panel--active') get addActiveClass(): boolean {
    return this.activeOverlay();
  }

  ngOnDestroy(): void {
    this._documentClickSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this._documentClickSubscription = fromEvent(
      this.elementRef.nativeElement,
      'click'
    )
      .pipe(
        filter(() => !!this.elementRef?.nativeElement && this.activeOverlay())
      )
      .subscribe(() => this.clickOutside.emit());
  }
}
