import { Component, Optional, Self, computed, input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { provideIcons } from '@ng-icons/core';
import { heroMinusSmall, heroPlusSmall } from '@ng-icons/heroicons/outline';

import { IconComponent } from '../../icon';
import { BaseInput } from '../base/base-input';
import { INPUT_CLASSES, INPUT_IMPORTS } from '../base/input-constants';
import { LIV_INPUT_COMPONENT_TOKEN } from '../base/input-tokens';

@Component({
  selector: 'liv-count-input',
  imports: [...INPUT_IMPORTS, IconComponent],
  providers: [
    provideIcons({
      heroMinusSmall,
      heroPlusSmall
    }),
    {
      provide: LIV_INPUT_COMPONENT_TOKEN,
      useExisting: CountInputComponent
    }
  ],
  templateUrl: './count-input.component.html',
  styleUrl: './count-input.component.css'
})
export class CountInputComponent extends BaseInput {
  readonly min = input<number>(1);
  readonly max = input<number>(100);
  readonly step = input<number>(1);

  readonly canDecrement = computed(() => this.getNumericValue() > this.min());
  readonly canIncrement = computed(() => this.getNumericValue() < this.max());

  protected override get inputClasses(): string {
    return `${INPUT_CLASSES} text-center`;
  }

  constructor(@Self() @Optional() control: NgControl) {
    super(control);
  }

  increment(): void {
    const currentValue = this.getNumericValue();
    if (currentValue < this.max()) {
      const newValue = Math.min(currentValue + this.step(), this.max());
      this.value.set(newValue.toString());
    }
  }

  decrement(): void {
    const currentValue = this.getNumericValue();
    if (currentValue > this.min()) {
      const newValue = Math.max(currentValue - this.step(), this.min());
      this.value.set(newValue.toString());
    }
  }

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const numericValue = target.value.replace(/\D/g, '');
    const value = numericValue ? parseInt(numericValue, 10) : this.min();

    if (!isNaN(value)) {
      const clampedValue = Math.max(this.min(), Math.min(this.max(), value));
      target.value = clampedValue.toString();
      this.value.set(clampedValue.toString());
    } else {
      target.value = this.min().toString();
      this.value.set(this.min().toString());
    }
  }

  private getNumericValue(): number {
    const value = this.value();
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? this.min() : parsed;
    }
    return this.min();
  }
}
