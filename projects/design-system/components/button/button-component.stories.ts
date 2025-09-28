import { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent } from './button.component';

type StoryArgs = {
  variant: 'primary' | 'secondary';
  disabled: boolean;
  content: string;
};

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary']
    },
    disabled: { control: 'boolean' }
  },
  args: {
    variant: 'primary',
    disabled: false
  },
  render: (args) => ({
    props: args,
    template: `<ds-button [variant]="variant" [disabled]="disabled">{{content}}</ds-button>`
  })
};

export default meta;

export const Primary: StoryObj<StoryArgs> = {
  args: {
    variant: 'primary',
    disabled: false,
    content: 'Primary Button'
  }
};

export const Secondary: StoryObj<StoryArgs> = {
  args: {
    variant: 'secondary',
    disabled: false,
    content: 'Secondary Button'
  }
};

export const Disabled: StoryObj<StoryArgs> = {
  args: {
    variant: 'primary',
    disabled: true,
    content: 'Disabled Button'
  }
};
