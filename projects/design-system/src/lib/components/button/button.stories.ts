import { Meta, StoryObj } from '@storybook/angular';

import { LivButtonComponent } from './button.component';

type StoryArgs = {
  variant: 'primary' | 'secondary';
  disabled: boolean;
  content: string;
};

const meta: Meta<LivButtonComponent> = {
  title: 'Components/Button',
  component: LivButtonComponent,
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
    template: `<liv-button [variant]="variant" [disabled]="disabled">{{content}}</liv-button>`
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
