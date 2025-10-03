import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

const getQueryParams = (url: string): Record<string, string> => {
  const params = new URL(url).searchParams;
  const obj: Record<string, string> = {};
  for (const key of params.keys()) {
    obj[key] = params.get(key) ?? '';
  }
  return obj;
};

@Directive({
  standalone: true,
  selector: '[livRouteTransform]'
})
export class RouteTransformDirective {
  constructor(
    private _: ElementRef,
    private router: Router
  ) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (event.target instanceof HTMLAnchorElement === false) {
      return;
    }

    event.preventDefault();

    const target = event.target;

    if (target.target === '_blank') {
      window.open(target.href, '_blank', 'noopener noreferrer');
      return;
    }

    const queryParams = getQueryParams(event.target.href) || {};

    this.router.navigate([target.pathname], {
      queryParams
    });
  }
}
