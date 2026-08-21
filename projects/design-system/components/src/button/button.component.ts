import { Component, input } from '@angular/core';

import { NgpButton } from 'ng-primitives/button';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonVariant = 'filled' | 'outline' | 'ghost' | 'link';
export type ButtonShape = 'square' | 'rounded' | 'pill';
export type ButtonIntent = 'primary' | 'secondary' | 'tertiary' | 'destructive';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[liv-button]',
  hostDirectives: [{ directive: NgpButton, inputs: ['disabled'] }],
  styleUrl: './button.component.css',
  templateUrl: './button.component.html',
  host: {
    '[attr.data-size]': 'size()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-intent]': 'intent()',
    '[attr.data-shape]': 'shape()'
  }
})
export class ButtonComponent {
  readonly size = input<ButtonSize>('md');
  readonly variant = input<ButtonVariant>('filled');
  readonly intent = input<ButtonIntent>('primary');
  readonly shape = input<ButtonShape>('rounded');
}
