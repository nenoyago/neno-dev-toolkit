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
      options: ['primary', 'secondary']
    },
    disabled: { control: 'boolean' },
    htmlType: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset']
    }
  },
  args: {
    variant: 'primary',
    disabled: false
  },
  render: (args) => ({
    props: args,
    template: `<button liv-button [variant]="variant" [disabled]="disabled">{{content}}</button>`
  })
};

export default meta;

export const Primary: StoryObj<ButtonStory> = {
  args: {
    variant: 'primary',
    disabled: false,
    htmlType: 'button',
    content: 'Primary Button'
  }
};

export const Secondary: StoryObj<ButtonStory> = {
  args: {
    variant: 'secondary',
    disabled: false,
    htmlType: 'button',
    content: 'Secondary Button'
  }
};

export const Disabled: StoryObj<ButtonStory> = {
  args: {
    variant: 'primary',
    disabled: true,
    htmlType: 'button',
    content: 'Disabled Button'
  }
};
