import { Meta, StoryObj } from '@storybook/angular';

import { NumberInputComponent } from './number-input.component';

const meta: Meta<NumberInputComponent> = {
  title: 'Components/Input/Number',
  tags: ['autodocs'],
  component: NumberInputComponent,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    shape: { control: 'select', options: ['square', 'rounded', 'pill'] },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    placeholder: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' }
  }
};

export default meta;

type Story = StoryObj<NumberInputComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Enter number',
    size: 'md',
    shape: 'rounded'
  }
};

export const WithLimits: Story = {
  args: {
    placeholder: 'Enter number (1-100)',
    min: 1,
    max: 100,
    step: 1,
    size: 'md',
    shape: 'rounded'
  }
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled number input',
    disabled: true,
    size: 'md',
    shape: 'rounded'
  }
};

export const Small: Story = {
  args: {
    placeholder: 'Small number input',
    size: 'sm',
    shape: 'rounded'
  }
};

export const Large: Story = {
  args: {
    placeholder: 'Large number input',
    size: 'lg',
    shape: 'rounded'
  }
};
