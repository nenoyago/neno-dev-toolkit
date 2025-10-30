import { Component, Optional, Self, signal, computed } from '@angular/core';
import { NgControl } from '@angular/forms';

import { IconComponent } from '../../icon';
import { BaseInput } from '../base/base-input';
import { INPUT_IMPORTS } from '../base/input-constants';
import { LIV_INPUT_COMPONENT_TOKEN } from '../base/input-tokens';

@Component({
  selector: 'liv-password-input',
  imports: [...INPUT_IMPORTS, IconComponent],
  providers: [
    {
      provide: LIV_INPUT_COMPONENT_TOKEN,
      useExisting: PasswordInputComponent
    }
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css'
})
export class PasswordInputComponent extends BaseInput {
  protected readonly type = signal<string>('password');
  protected readonly isVisible = signal(false);

  readonly computedType = computed(() =>
    this.isVisible() ? 'text' : this.type()
  );

  constructor(@Self() @Optional() control: NgControl) {
    super(control);
  }

  toggleVisibility(): void {
    this.isVisible.update((visible) => !visible);
  }
}
