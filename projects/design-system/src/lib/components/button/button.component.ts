/* eslint-disable max-len */
import { NgClass } from '@angular/common';
import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      type="button"
      [disabled]="disabled()"
      [ngClass]="[
        'px-4 py-2 text-sm font-semibold rounded transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2',
        variant() === 'primary'
          ? 'bg-brand-primary-pure text-white enabled:hover:bg-brand-primary-light enabled:focus:ring-brand-primary-light enabled:focus:ring-offset-brand-primary-lightest enabled:focus:bg-brand-primary-dark enabled:active:bg-brand-primary-dark'
          : '',
        variant() === 'secondary'
          ? 'bg-brand-secondary-pure text-white enabled:hover:bg-brand-secondary-light enabled:focus:ring-brand-secondary-light enabled:focus:ring-offset-brand-secondary-lightest enabled:focus:bg-brand-secondary-dark enabled:active:bg-brand-secondary-dark'
          : '',
        variant() === 'tertiary'
          ? 'bg-transparent text-brand-primary-pure border border-brand-primary-pure enabled:hover:bg-brand-primary-lightest enabled:focus:ring-brand-primary-light enabled:focus:ring-offset-brand-primary-lightest enabled:focus:bg-brand-primary-light enabled:active:bg-brand-primary-dark enabled:active:text-white'
          : ''
      ]"
    >
      <ng-content />
    </button>
  `
})
export class LivButtonComponent {
  /**
   * Variante visual do botão.
   * @default 'primary'
   */
  readonly variant = input<'primary' | 'secondary' | 'tertiary'>('primary');

  /**
   * Desabilita o botão.
   * @default false
   */
  readonly disabled = input(false, {
    transform: booleanAttribute
  });
}
