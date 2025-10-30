import { trigger, transition, style, animate } from '@angular/animations';
import {
  Component,
  OnInit,
  input,
  computed,
  contentChild,
  signal,
  effect,
  OnDestroy
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

import {
  NgpFormField,
  NgpError,
  NgpDescription
} from 'ng-primitives/form-field';
import { Subscription } from 'rxjs';

import { getFormErrorMessage } from './get-form-error-message';
import { IconComponent } from '../icon';
import { BaseInput } from '../input/base/base-input';
import { LIV_INPUT_COMPONENT_TOKEN } from '../input/base/input-tokens';

@Component({
  selector: 'liv-form-field',
  imports: [NgpFormField, NgpError, NgpDescription, IconComponent],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-12px)',
          height: '0',
          overflow: 'hidden'
        }),
        animate(
          '200ms ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)',
            height: '*'
          })
        )
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({
            opacity: 0,
            transform: 'translateY(-8px)',
            height: '0',
            overflow: 'hidden'
          })
        )
      ])
    ])
  ]
})
export class FormFieldComponent implements OnInit, OnDestroy {
  readonly hint = input<string | undefined>(undefined);
  readonly label = input<string | undefined>(undefined);

  readonly livInput = contentChild<BaseInput>(LIV_INPUT_COMPONENT_TOKEN);

  private readonly _error = signal<string | null>(null);
  private readonly _isRequired = signal<boolean>(false);

  readonly control = computed(() => this.livInput()?.control);

  readonly errorMessage = computed(() => {
    return this._error();
  });

  readonly isRequired = this._isRequired.asReadonly();

  private statusChangesSubscription: Subscription | null = null;

  constructor() {
    this.setupControlStatusEffect();
  }

  ngOnInit(): void {
    if (!this.livInput() || !this.livInput()?.control) {
      console.warn(
        'FormFieldComponent requires a LIV input component (such as <liv-input>, <liv-count-input>, etc.) with an NgControl (formControlName/ngModel).'
      );
    }
  }

  ngOnDestroy(): void {
    this.cleanupStatusChangesSubscription();
  }

  private setupControlStatusEffect(): void {
    effect(() => {
      const ngControl = this.control();

      this.cleanupStatusChangesSubscription();

      if (ngControl?.statusChanges) {
        this.updateControlState(ngControl);

        this.statusChangesSubscription = ngControl.statusChanges.subscribe(
          () => {
            this.updateControlState(ngControl);
          }
        );
      } else if (ngControl) {
        this.updateControlState(ngControl);
      } else {
        this._error.set(null);
        this._isRequired.set(false);
      }
    });
  }

  private cleanupStatusChangesSubscription(): void {
    if (this.statusChangesSubscription) {
      this.statusChangesSubscription.unsubscribe();
      this.statusChangesSubscription = null;
    }
  }

  private updateControlState(ngControl: NgControl): void {
    if (!ngControl) return;

    const isRequired = this.checkIfRequired(ngControl);
    this._isRequired.set(isRequired);

    const { touched, invalid, errors } = ngControl;
    const shouldShowError = touched && invalid;

    if (shouldShowError) {
      this._error.set(this.getErrorMessage(ngControl, errors));
    } else {
      this._error.set(null);
    }
  }

  private checkIfRequired(ngControl: NgControl): boolean {
    if (!ngControl.control?.validator) {
      return false;
    }
    const validator = ngControl.control.validator({} as AbstractControl);
    return !!(validator && validator['required']);
  }

  private getErrorMessage(
    ngControl: NgControl,
    errors: Record<string, unknown> | null
  ): string | null {
    if (!errors) {
      return null;
    }

    for (const [propertyName, propertyValue] of Object.entries(errors)) {
      if (ngControl.dirty || ngControl.touched) {
        const fieldName = this.label() || this.livInput()?.name() || 'Campo';

        const formErrorMessage = getFormErrorMessage(
          fieldName,
          propertyName,
          propertyValue as Record<string, string>
        );

        if (formErrorMessage) {
          return formErrorMessage;
        }

        if (typeof propertyValue === 'string') {
          return propertyValue;
        }

        return 'Campo inválido.';
      }
    }
    return null;
  }
}
