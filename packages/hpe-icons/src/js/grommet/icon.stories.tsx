import type { Meta, StoryObj } from '@storybook/react';
import * as Icons from './icons';

const meta: Meta = {
  title: 'Icons/HPE icons for Grommet',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Grommet-based HPE icons for use with the HPE Design System',
      },
    },
  },
  tags: ['autodocs'],
};

interface IconArgs {
  iconName?: keyof typeof Icons;
  theme?: object;
}

const Icon = {
  render: (args: IconArgs) => {
    const { iconName } = args;
    const IconComponent = Icons[iconName || 'Accessibility'];
    return (
        <IconComponent />
    );
  },
  argTypes: {
    iconName: {
      control: { type: 'select' as const },
      options: Object.keys(Icons) as (keyof typeof Icons)[],
      description: 'Name of the icon to display',
    },
    theme: {
      control: { type: 'object' as const },
      description: 'Custom theme object to apply to the icon',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...Icon,
};

