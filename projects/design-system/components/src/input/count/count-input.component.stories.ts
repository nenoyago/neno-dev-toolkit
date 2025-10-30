import { Meta, StoryObj } from '@storybook/angular';

import { CountInputComponent } from './count-input.component';

const meta: Meta<CountInputComponent> = {
  title: 'Components/Input/Count',
  tags: ['autodocs'],
  component: CountInputComponent,
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

type Story = StoryObj<CountInputComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Enter quantity',
    min: 1,
    max: 100,
    step: 1,
    size: 'md',
    shape: 'rounded'
  }
};

export const SmallRange: Story = {
  args: {
    placeholder: 'Enter quantity',
    min: 0,
    max: 10,
    step: 1,
    size: 'md',
    shape: 'rounded'
  }
};

export const LargeRange: Story = {
  args: {
    placeholder: 'Enter quantity',
    min: 1,
    max: 1000,
    step: 10,
    size: 'md',
    shape: 'rounded'
  }
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled count input',
    disabled: true,
    min: 1,
    max: 100,
    size: 'md',
    shape: 'rounded'
  }
};

export const Small: Story = {
  args: {
    placeholder: 'Small count input',
    min: 1,
    max: 50,
    size: 'sm',
    shape: 'rounded'
  }
};

export const Large: Story = {
  args: {
    placeholder: 'Large count input',
    min: 1,
    max: 100,
    size: 'lg',
    shape: 'rounded'
  }
};
