import { Component, Optional, Self, input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { BaseInput } from '../base/base-input';
import { INPUT_IMPORTS } from '../base/input-constants';
import { LIV_INPUT_COMPONENT_TOKEN } from '../base/input-tokens';

@Component({
  selector: 'liv-number-input',
  imports: INPUT_IMPORTS,
  providers: [
    {
      provide: LIV_INPUT_COMPONENT_TOKEN,
      useExisting: NumberInputComponent
    }
  ],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.css'
})
export class NumberInputComponent extends BaseInput {
  readonly min = input<number | undefined>(undefined);
  readonly max = input<number | undefined>(undefined);
  readonly step = input<number | undefined>(undefined);

  constructor(@Self() @Optional() control: NgControl) {
    super(control);
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    target.value = target.value.replace(/\D/g, '');
  }
}
