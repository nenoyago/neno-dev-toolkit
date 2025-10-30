import { Component, Optional, Self, input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { BaseInput } from './base/base-input';
import {
  INPUT_IMPORTS,
  LEADING_SPAN_CLASSES_NON_INTERACTIVE,
  TRAILING_SPAN_CLASSES_NON_INTERACTIVE
} from './base/input-constants';
import { LIV_INPUT_COMPONENT_TOKEN } from './base/input-tokens';

@Component({
  selector: 'liv-input',
  imports: INPUT_IMPORTS,
  providers: [
    {
      provide: LIV_INPUT_COMPONENT_TOKEN,
      useExisting: InputComponent
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent extends BaseInput {
  readonly type = input<string>('text');

  protected override get leadingSpanClasses(): string {
    return LEADING_SPAN_CLASSES_NON_INTERACTIVE;
  }

  protected override get trailingSpanClasses(): string {
    return TRAILING_SPAN_CLASSES_NON_INTERACTIVE;
  }

  constructor(@Self() @Optional() control: NgControl) {
    super(control);
  }

  protected override getType(): string {
    return this.type();
  }
}
