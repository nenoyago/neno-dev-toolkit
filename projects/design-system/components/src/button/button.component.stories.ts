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
    template: `<ds-button [variant]="variant" [disabled]="disabled">{{content}}</ds-button>`
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
    disabled: false,
    content: 'Secondary Button'
  }
};

export const Tertiary: StoryObj<ButtonStory> = {
  args: {
    variant: 'tertiary',
    disabled: false,
    content: 'Tertiary Button'
  }
};

export const Disabled: StoryObj<ButtonStory> = {
  args: {
    variant: 'primary',
    disabled: true,
    content: 'Disabled Button'
  }
};
