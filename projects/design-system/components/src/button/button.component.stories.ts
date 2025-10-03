import { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent } from './button.component';

type StoryArgs = {
  content: string;
};

type ButtonStory = ButtonComponent & StoryArgs;

const meta: Meta<ButtonStory> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary']
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

export const Primary: StoryObj<ButtonStory> = {
  args: {
    variant: 'primary',
    disabled: false,
    content: 'Primary Button'
  }
};

export const Secondary: StoryObj<ButtonStory> = {
  args: {
    variant: 'secondary',
    disabled: true,
    content: 'Secondary Button'
  }
};

export const Disabled: StoryObj<ButtonStory> = {
  args: {
    variant: 'primary',
    disabled: true,
    content: 'Disabled Button'
  }
};
