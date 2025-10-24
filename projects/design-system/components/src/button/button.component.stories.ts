import { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent } from './button.component';

type StoryArgs = {
  content: string;
  leadingContent: string;
  trailingContent: string;
  disabled: boolean;
};

type ButtonStory = ButtonComponent & StoryArgs;

const meta: Meta<ButtonStory> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link'
      ]
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl']
    },
    disabled: {
      control: 'boolean'
    },
    leadingContent: {
      control: 'text',
      description: 'Conteúdo para o slot leading'
    },
    trailingContent: {
      control: 'text',
      description: 'Conteúdo para o slot trailing'
    }
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    content: 'Button',
    leadingContent: 'teste',
    trailingContent: 'test2'
  },
  render: (args) => ({
    props: args,
    template: `
      <button liv-button [variant]="variant" [size]="size" [disabled]="disabled">
      @if (leadingContent) {
        <span slot="leading">{{leadingContent}}</span>
      }
        {{content}}
        @if (trailingContent) {
        <span  slot="trailing">{{trailingContent}}</span>
        }
      </button>
    `
  })
};

export default meta;

export const Primary: StoryObj<ButtonStory> = {
  args: {
    variant: 'primary',
    content: 'Primary Button'
  }
};

export const Secondary: StoryObj<ButtonStory> = {
  args: {
    variant: 'secondary',
    content: 'Secondary Button'
  }
};

export const Disabled: StoryObj<ButtonStory> = {
  args: {
    variant: 'primary',
    content: 'Disabled Button'
  }
};
