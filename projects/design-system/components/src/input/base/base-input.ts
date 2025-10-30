/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  booleanAttribute,
  computed,
  effect,
  input,
  linkedSignal,
  output,
  signal,
  viewChild
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl
} from '@angular/forms';

import { Subscription } from 'rxjs';

import {
  INPUT_CLASSES,
  LEADING_SPAN_CLASSES,
  TRAILING_SPAN_CLASSES,
  WRAPPER_CLASSES
} from './input-constants';

export function sanitizeForDataAttr(value: string): string {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/_/g, '-')
    .replace(/--+/g, '-')
    .replace(/-$/g, '');
}

export interface InputProps {
  name: string;
  placeholder?: string;
  disabled: boolean;
  readonly?: boolean;
}

@Component({
  standalone: true,
  template: ''
})
export class BaseInput implements ControlValueAccessor, OnInit, OnDestroy {
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly name = input('');
  readonly componentId = input('', {
    alias: 'id'
  });

  readonly placeholder = input('');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly shape = input<'square' | 'rounded' | 'pill'>('rounded');
  readonly readonly = input(false, { transform: booleanAttribute });

  readonly maxlength = input<number | undefined>(undefined);
  readonly autocomplete = input('off');
  readonly autocapitalize = input<'words' | 'characters' | 'on' | 'off'>('off');

  readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('inputRef');

  readonly dynamicClasses = computed(() => {
    const size = this.size();
    const isInvalid = this.isInvalid();
    const shape = this.shape();

    const classes: Record<string, boolean> = {
      'ring-feedback-error-medium placeholder:text-feedback-error-light text-feedback-error-medium focus:ring-feedback-error-medium':
        isInvalid,
      'ring-neutral-400 placeholder:text-neutral-400 text-neutral-700 focus:ring-main-primary-500 hover:ring-main-primary-300':
        !isInvalid,
      'rounded-none': shape === 'square',
      'rounded-md': shape === 'rounded',
      'rounded-full': shape === 'pill'
    };

    const sizeConfigs: Record<string, { py: string }> = {
      sm: { py: 'py-1 text-sm leading-6' },
      md: { py: 'py-1.5 text-sm leading-6' },
      lg: { py: 'py-2 text-base leading-7' }
    };

    const config = sizeConfigs[size];
    if (config) {
      classes[config.py] = true;
    }

    return classes;
  });

  protected get inputClasses(): string {
    return INPUT_CLASSES;
  }

  protected get leadingSpanClasses(): string {
    return LEADING_SPAN_CLASSES;
  }
  protected get trailingSpanClasses(): string {
    return TRAILING_SPAN_CLASSES;
  }
  protected readonly wrapperClasses = WRAPPER_CLASSES;

  private readonly _props = signal<InputProps>({
    name: '',
    placeholder: '',
    disabled: false,
    readonly: false
  });
  protected readonly value = signal<string>('');
  private readonly formDisabled = signal<boolean>(false);

  private readonly _isInvalid = signal<boolean>(false);
  private readonly _isValid = signal<boolean>(false);
  private readonly _isRequired = signal<boolean>(false);

  readonly id = linkedSignal(() => {
    const componentId = this.componentId();
    if (componentId) {
      return sanitizeForDataAttr(componentId);
    }
    return `liv-input-${Math.random().toString(36).substring(2, 15)}`;
  });

  private statusChangesSubscription: Subscription | null = null;

  readonly props = this._props.asReadonly();
  readonly isInvalid = this._isInvalid.asReadonly();
  readonly isValid = this._isValid.asReadonly();
  readonly isRequired = this._isRequired.asReadonly();

  protected readonly blur = output<FocusEvent>();
  protected readonly focus = output<FocusEvent>();

  constructor(@Self() @Optional() public readonly control: NgControl) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
    this.setupDisabledEffect();
    this.setupPropsEffect();
    this.setupValueEffect();
    this.setupInputEffect();
  }

  private setupDisabledEffect(): void {
    effect(() => {
      const inputDisabled = this.disabled();
      const formDisabled = this.formDisabled();
      const isMergedDisabled = inputDisabled || formDisabled;

      this._props.update((current) => ({
        ...current,
        disabled: isMergedDisabled
      }));
    });
  }

  private setupPropsEffect(): void {
    effect(() => {
      this._props.update((current) => ({
        ...current,
        name: this.name(),
        placeholder: this.placeholder(),
        size: this.size(),
        shape: this.shape(),
        readonly: this.readonly()
      }));
    });
  }

  private setupValueEffect(): void {
    effect(() => {
      const currentValue = this.value();
      if (currentValue !== undefined) {
        this.onChangeCb(currentValue);
        if (currentValue !== null && currentValue !== '') {
          this.onTouchedCb(currentValue);
        }
      }
    });
  }
  private setupInputEffect(): void {
    effect(() => {
      const nativeElement = this.inputRef()?.nativeElement;
      if (nativeElement) {
        nativeElement.id = this.id();
        nativeElement.name = this.name();
        nativeElement.type = this.getType();
        nativeElement.placeholder = this.placeholder();
        nativeElement.readOnly = !!this.props().readonly;
        nativeElement.disabled = this.props().disabled;
      }
    });
  }

  protected getType(): string {
    return 'text';
  }

  ngOnInit(): void {
    this.setupControlObservables();
    this.updateControlState();
  }

  ngOnDestroy(): void {
    this.cleanupStatusChangesSubscription();
  }

  private setupControlObservables(): void {
    if (this.control?.statusChanges) {
      this.cleanupStatusChangesSubscription();
      this.statusChangesSubscription = this.control.statusChanges.subscribe(
        () => {
          this.updateControlState();
        }
      );
    }
  }

  private cleanupStatusChangesSubscription(): void {
    this.statusChangesSubscription?.unsubscribe();
    this.statusChangesSubscription = null;
  }

  private updateControlState(): void {
    if (!this.control) {
      return;
    }

    const isRequired = this.checkIfRequired();
    this._isRequired.set(isRequired);
    this._props.update((current) => ({
      ...current,
      showRequired: isRequired
    }));

    const { touched, invalid, valid } = this.control;
    const shouldShowError = touched && invalid;

    this._isInvalid.set(Boolean(shouldShowError));
    this._isValid.set(Boolean(touched && valid));
  }

  private checkIfRequired(): boolean {
    if (!this.control?.control?.validator) {
      return false;
    }
    const validator = this.control.control.validator({} as AbstractControl);
    return !!(validator && validator['required']);
  }

  handleFocus(event: FocusEvent): void {
    this.focus.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.onTouchedCb(this.value());
    this.blur.emit(event);
  }

  setProps(props: Partial<InputProps>): void {
    this._props.update((currentProps) => ({
      ...currentProps,
      ...props
    }));
  }

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: (_: string) => void): void {
    this.onTouchedCb = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  protected onChangeCb: (_: string) => void = () => {};
  protected onTouchedCb: (_: string) => void = () => {};
}
