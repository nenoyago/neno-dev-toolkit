import { booleanAttribute, Component, computed, input } from '@angular/core';

import { NgpButton } from 'ng-primitives/button';

type Variant = 'primary' | 'secondary';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[liv-button]',
  imports: [NgpButton],
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.css'],
  host: {
    '[attr.type]': 'htmlType()',
    '[attr.form]': 'formId()',
    '[class]': 'variantClass()'
  },
  hostDirectives: [{ directive: NgpButton, inputs: ['disabled'] }]
})
export class ButtonComponent {
  readonly variant = input<Variant>('primary');
  readonly disabled = input(false, {
    transform: booleanAttribute
  });
  readonly formId = input('', {
    transform: (value) => (value === null ? '' : value)
  });
  readonly htmlType = input<'button' | 'submit' | 'reset'>('button');
  readonly rounded = input(false, {
    transform: booleanAttribute
  });

  readonly variantClass = computed(() => {
    const classes = ['liv-button', `liv-button--${this.variant()}`];
    if (this.rounded()) {
      classes.push('liv-button--rounded');
    }
    return classes.join(' ');
  });
}
