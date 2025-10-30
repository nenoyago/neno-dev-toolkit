import { Meta, StoryObj } from '@storybook/angular';

import { PasswordInputComponent } from './password-input.component';

const meta: Meta<PasswordInputComponent> = {
  title: 'Components/Input/Password',
  tags: ['autodocs'],
  component: PasswordInputComponent,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    shape: { control: 'select', options: ['square', 'rounded', 'pill'] },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    placeholder: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<PasswordInputComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Enter password',
    size: 'md',
    shape: 'rounded'
  }
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled password input',
    disabled: true,
    size: 'md',
    shape: 'rounded'
  }
};

export const Small: Story = {
  args: {
    placeholder: 'Small password input',
    size: 'sm',
    shape: 'rounded'
  }
};

export const Large: Story = {
  args: {
    placeholder: 'Large password input',
    size: 'lg',
    shape: 'rounded'
  }
};
