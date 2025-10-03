import { Directive, HostBinding, input, model, signal } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'img[fallback]',
  host: {
    '(error)': 'handleImageError()',
    '(load)': 'handleImageLoad()',
    '[src]': 'src'
  },
  standalone: true
})
export class ImagePreloadDirective {
  readonly src = model('');
  readonly fallback = input<string>('');

  private status = signal<'loading' | 'loaded' | 'error'>('loading');

  @HostBinding('attr.data-loaded') get loadStatus() {
    return this.status();
  }

  @HostBinding('class.shimmer') get isError() {
    return this.status() === 'error';
  }

  handleImageError() {
    this.src.set(this.fallback());
    this.status.set('error');
  }

  handleImageLoad() {
    this.status.set('loaded');
  }
}
