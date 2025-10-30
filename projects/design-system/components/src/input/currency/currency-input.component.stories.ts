import { Meta, StoryObj } from '@storybook/angular';

import {
  CurrencyInputComponent,
  SUPPORTED_CURRENCIES
} from './currency-input.component';

const meta: Meta<CurrencyInputComponent> = {
  title: 'Components/Input/Currency',
  tags: ['autodocs'],
  component: CurrencyInputComponent,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    shape: { control: 'select', options: ['square', 'rounded', 'pill'] },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    placeholder: { control: 'text' },
    currencyCode: {
      control: 'select',
      options: SUPPORTED_CURRENCIES.map((c) => c.code)
    },
    align: { control: 'select', options: ['left', 'right'] },
    allowNegative: { control: 'boolean' },
    allowZero: { control: 'boolean' },
    decimal: { control: 'text' },
    thousands: { control: 'text' },
    precision: { control: 'number' }
  }
};

export default meta;

type Story = StoryObj<CurrencyInputComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Enter amount',
    currencyCode: 'BRL',
    size: 'md',
    shape: 'rounded'
  }
};

export const USD: Story = {
  args: {
    placeholder: 'Enter amount in USD',
    currencyCode: 'USD',
    decimal: '.',
    thousands: ',',
    size: 'md',
    shape: 'rounded'
  }
};

export const WithLimits: Story = {
  args: {
    placeholder: 'Enter amount',
    currencyCode: 'EUR',
    allowNegative: false,
    allowZero: true,
    precision: 2,
    size: 'md',
    shape: 'rounded'
  }
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled currency input',
    disabled: true,
    size: 'md',
    shape: 'rounded'
  }
};

export const Small: Story = {
  args: {
    placeholder: 'Small currency input',
    size: 'sm',
    shape: 'rounded'
  }
};

export const Large: Story = {
  args: {
    placeholder: 'Large currency input',
    size: 'lg',
    shape: 'rounded'
  }
};
