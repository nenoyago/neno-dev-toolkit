import { Meta, StoryObj } from '@storybook/angular';

import { InputComponent } from './input.component';
import { IconComponent } from '../icon';

const meta: Meta<InputComponent> = {
  title: 'Components/Input/Input',
  tags: ['autodocs'],
  component: InputComponent,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    shape: { control: 'select', options: ['square', 'rounded', 'pill'] },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['text', 'email', 'tel', 'url', 'search']
    },
    placeholder: { control: 'text' }
  }
};

export default meta;

type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
    size: 'md',
    shape: 'rounded',
    type: 'text'
  }
};

export const Email: Story = {
  args: {
    placeholder: 'Enter email',
    type: 'email',
    size: 'md',
    shape: 'rounded'
  }
};

export const Phone: Story = {
  args: {
    placeholder: 'Enter phone number',
    type: 'tel',
    size: 'md',
    shape: 'rounded'
  }
};

export const Search: Story = {
  args: {
    placeholder: 'Search...',
    type: 'search',
    size: 'md',
    shape: 'rounded'
  }
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    size: 'md',
    shape: 'rounded'
  }
};

export const Small: Story = {
  args: {
    placeholder: 'Small input',
    size: 'sm',
    shape: 'rounded'
  }
};

export const Large: Story = {
  args: {
    placeholder: 'Large input',
    size: 'lg',
    shape: 'rounded'
  }
};

export const WithIcons: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [IconComponent]
    },
    template: `
      <liv-input 
        placeholder="Search..." 
        size="md" 
        shape="rounded" 
    >
      <liv-icon name="heroHeart" slot="leading"></liv-icon>
      <liv-icon name="lucideUser" slot="trailing"></liv-icon>
    </liv-input>
    `
  })
};
