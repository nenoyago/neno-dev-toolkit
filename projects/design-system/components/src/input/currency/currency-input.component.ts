import {
  Component,
  Optional,
  Self,
  input,
  computed,
  booleanAttribute
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { NgxCurrencyDirective, NgxCurrencyInputMode } from 'ngx-currency';

import { BaseInput } from '../base/base-input';
import { INPUT_IMPORTS } from '../base/input-constants';
import { LIV_INPUT_COMPONENT_TOKEN } from '../base/input-tokens';

export const SUPPORTED_CURRENCIES = [
  { country: 'Brazil', code: 'BRL', symbol: 'R$' },
  { country: 'United States', code: 'USD', symbol: '$' },
  { country: 'European Union', code: 'EUR', symbol: '€' },
  { country: 'United Kingdom', code: 'GBP', symbol: '£' },
  { country: 'Japan', code: 'JPY', symbol: '¥' },
  { country: 'Argentina', code: 'ARS', symbol: '$' },
  { country: 'Bolivia', code: 'BOB', symbol: 'Bs.' },
  { country: 'Chile', code: 'CLP', symbol: '$' },
  { country: 'Colombia', code: 'COP', symbol: '$' },
  { country: 'Paraguay', code: 'PYG', symbol: '₲' },
  { country: 'Peru', code: 'PEN', symbol: 'S/' },
  { country: 'Uruguay', code: 'UYU', symbol: '$' },
  { country: 'Venezuela', code: 'VES', symbol: 'Bs.' },
  { country: 'Mexico', code: 'MXN', symbol: '$' }
] as const;

type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number]['code'];

@Component({
  selector: 'liv-currency-input',
  imports: [...INPUT_IMPORTS, NgxCurrencyDirective],
  providers: [
    {
      provide: LIV_INPUT_COMPONENT_TOKEN,
      useExisting: CurrencyInputComponent
    }
  ],
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.css'
})
export class CurrencyInputComponent extends BaseInput {
  readonly currencyCode = input<SupportedCurrency>('BRL');
  readonly align = input<'left' | 'right'>('left');
  readonly allowNegative = input(false, {
    transform: booleanAttribute
  });
  readonly allowZero = input(false, {
    transform: booleanAttribute
  });
  readonly showPrefix = input(true, {
    transform: booleanAttribute
  });
  readonly showSuffix = input(false, {
    transform: booleanAttribute
  });
  readonly decimal = input<string>(',');
  readonly thousands = input<string>('.');
  readonly precision = input<number>(2);

  readonly currencyMaskOptions = computed(() => {
    const { code, symbol } = this.getCurrency();

    return {
      align: this.align(),
      allowNegative: this.allowNegative(),
      allowZero: this.allowZero(),
      decimal: this.decimal(),
      precision: this.precision(),
      prefix: this.showPrefix() ? `${symbol} ` : '',
      suffix: this.showSuffix() ? ` ${code}` : '',
      thousands: this.thousands(),
      nullable: false,
      min: null,
      max: null,
      inputMode: NgxCurrencyInputMode.Financial
    };
  });

  private getCurrency() {
    const code = this.currencyCode();
    const symbol =
      SUPPORTED_CURRENCIES.find((c) => c.code === code)?.symbol || '';
    return {
      code,
      symbol
    };
  }

  constructor(@Self() @Optional() control: NgControl) {
    super(control);
  }
}
