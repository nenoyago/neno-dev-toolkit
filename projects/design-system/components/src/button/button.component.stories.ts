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
      options: ['filled', 'outline', 'ghost', 'link']
    },
    intent: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'destructive']
    },
    shape: {
      control: { type: 'select' },
      options: ['square', 'rounded', 'pill']
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
    variant: 'filled',
    intent: 'primary',
    shape: 'rounded',
    size: 'md',
    disabled: false,
    content: 'Button',
    leadingContent: '',
    trailingContent: ''
  },
  render: (args) => ({
    props: args,
    template: `
      <button liv-button [variant]="variant" [intent]="intent" [shape]="shape" [size]="size" [disabled]="disabled">
        @if (leadingContent) {
          <span slot="leading">{{leadingContent}}</span>
        }
        {{content}}
        @if (trailingContent) {
          <span slot="trailing">{{trailingContent}}</span>
        }
      </button>
    `
  })
};

export default meta;

export const FilledVariants: StoryObj<ButtonStory> = {
  args: {
    variant: 'filled',
    intent: 'primary',
    shape: 'rounded',
    size: 'md',
    disabled: false,
    content: 'Button',
    leadingContent: '',
    trailingContent: ''
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex gap-2">
        <button liv-button variant="filled" intent="primary" shape="rounded" size="md">Primary</button>
        <button liv-button variant="filled" intent="secondary" shape="rounded" size="md">Secondary</button>
        <button liv-button variant="filled" intent="tertiary" shape="rounded" size="md">Tertiary</button>
        <button liv-button variant="filled" intent="destructive" shape="rounded" size="md">Destructive</button>
      </div>
    `
  })
};

export const OutlineVariants: StoryObj<ButtonStory> = {
  args: {
    variant: 'outline',
    intent: 'primary',
    shape: 'rounded',
    size: 'md',
    disabled: false,
    content: 'Button',
    leadingContent: '',
    trailingContent: ''
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex gap-2">
        <button liv-button variant="outline" intent="primary" shape="rounded" size="md">Primary</button>
        <button liv-button variant="outline" intent="secondary" shape="rounded" size="md">Secondary</button>
        <button liv-button variant="outline" intent="tertiary" shape="rounded" size="md">Tertiary</button>
        <button liv-button variant="outline" intent="destructive" shape="rounded" size="md">Destructive</button>
      </div>
    `
  })
};

export const GhostVariants: StoryObj<ButtonStory> = {
  args: {
    variant: 'ghost',
    intent: 'primary',
    shape: 'rounded',
    size: 'md',
    disabled: false,
    content: 'Button',
    leadingContent: '',
    trailingContent: ''
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex gap-2">
        <button liv-button variant="ghost" intent="primary" shape="rounded" size="md">Primary</button>
        <button liv-button variant="ghost" intent="secondary" shape="rounded" size="md">Secondary</button>
        <button liv-button variant="ghost" intent="tertiary" shape="rounded" size="md">Tertiary</button>
        <button liv-button variant="ghost" intent="destructive" shape="rounded" size="md">Destructive</button>
      </div>
    `
  })
};

export const LinkVariants: StoryObj<ButtonStory> = {
  args: {
    variant: 'link',
    intent: 'primary',
    shape: 'rounded',
    size: 'md',
    disabled: false,
    content: 'Button',
    leadingContent: '',
    trailingContent: ''
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex gap-2">
        <button liv-button variant="link" intent="primary" shape="rounded" size="md">Primary</button>
        <button liv-button variant="link" intent="secondary" shape="rounded" size="md">Secondary</button>
        <button liv-button variant="link" intent="tertiary" shape="rounded" size="md">Tertiary</button>
        <button liv-button variant="link" intent="destructive" shape="rounded" size="md">Destructive</button>
      </div>
    `
  })
};

export const Shapes: StoryObj<ButtonStory> = {
  args: {
    variant: 'filled',
    intent: 'primary',
    shape: 'rounded',
    size: 'md',
    disabled: false,
    content: 'Button',
    leadingContent: '',
    trailingContent: ''
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex gap-2">
        <button liv-button variant="filled" intent="primary" shape="square" size="md">Square</button>
        <button liv-button variant="filled" intent="primary" shape="rounded" size="md">Rounded</button>
        <button liv-button variant="filled" intent="primary" shape="pill" size="md">Pill</button>
      </div>
    `
  })
};

export const Sizes: StoryObj<ButtonStory> = {
  args: {
    variant: 'filled',
    intent: 'primary',
    shape: 'rounded',
    size: 'md',
    disabled: false,
    content: 'Button',
    leadingContent: '',
    trailingContent: ''
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex gap-2 items-end">
        <button liv-button variant="filled" intent="primary" shape="rounded" size="sm">Small</button>
        <button liv-button variant="filled" intent="primary" shape="rounded" size="md">Medium</button>
        <button liv-button variant="filled" intent="primary" shape="rounded" size="lg">Large</button>
        <button liv-button variant="filled" intent="primary" shape="rounded" size="xl">Extra Large</button>
      </div>
    `
  })
};

export const Disabled: StoryObj<ButtonStory> = {
  args: {
    variant: 'filled',
    intent: 'primary',
    shape: 'rounded',
    size: 'md',
    disabled: true,
    content: 'Disabled Button',
    leadingContent: '',
    trailingContent: ''
  }
};
