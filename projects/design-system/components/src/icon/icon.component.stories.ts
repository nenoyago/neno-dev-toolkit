import { Meta } from '@storybook/angular';

import { IconComponent } from './icon.component';

type IconStory = IconComponent;

const meta: Meta<IconStory> = {
  title: 'Components/Icon',
  component: IconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: {
        type: 'text'
      }
    },
    size: {
      control: {
        type: 'text'
      }
    },
    strokeWidth: {
      control: { type: 'number' }
    },
    class: {
      control: { type: 'text' }
    },
    ngClass: {
      control: { type: 'object' }
    },
    style: {
      control: { type: 'text' }
    }
  }
};
export default meta;

const heroIcons = [
  'heroArrowDown',
  'heroArrowLeft',
  'heroArrowRight',
  'heroArrowUp',
  'heroArrowUpCircle',
  'heroArrowUpTray',
  'heroArrowUturnDown',
  'heroArrowUturnLeft',
  'heroArrowUturnRight',
  'heroArrowUturnUp'
];

export const HeroIconsShowcase = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        ${heroIcons.map((name) => `<liv-icon name="${name}" />`).join('')}
      </div>
    `
  })
};

const lucideIcons = [
  'lucideAlignJustify',
  'lucideAmbulance',
  'lucideAmpersand',
  'lucideAnchor',
  'lucideAngry',
  'lucideAnnoyed',
  'lucideAntenna',
  'lucideAnvil',
  'lucideAperture',
  'lucideApple',
  'lucideEyeOff'
];

export const LucideIconsShowcase = {
  args: {
    class: '',
    style: 'color: red;'
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        ${lucideIcons.map((name) => `<liv-icon name="${name}" />`).join('')}
      </div>
    `
  })
};
