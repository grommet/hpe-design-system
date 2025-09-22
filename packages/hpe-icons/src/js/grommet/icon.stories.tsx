import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { base } from './themes';
import * as Icons from './icons';

const customTheme = {
  global: {
    colors: {
      icon: '#2196f3',
      attention: '#ff3333',
    },
  },
  icon: {
    size: {
      small: '12px',
      medium: '24px',
      large: '48px',
      xlarge: '300px',
    },
  },
};

interface IconArgs {
  iconName: keyof typeof Icons;
  color?: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | string;
  theme: object;
}

const meta: Meta<IconArgs> = {
  title: 'Icons/HPE icons for Grommet',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Grommet-based HPE icons for use with the HPE Design System',
      },
    },
  },
  render: (args: IconArgs) => {
    const { iconName, color, size, theme } = args;
    const IconComponent = Icons[iconName];
    return (
      <ThemeProvider theme={theme}>
        <IconComponent color={color} size={size} />
      </ThemeProvider>
    );
  },
  argTypes: {
    iconName: {
      control: { type: 'select' as const },
      options: Object.keys(Icons) as (keyof typeof Icons)[],
      description: 'Name of the icon to display',
    },
    color: {
      control: { type: 'text' as const },
      description: 'Color of the icon',
    },
    size: {
      control: { type: 'select' as const },
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],
      description: 'Size of the icon',
    },
    theme: {
      control: { type: 'object' as const },
      description: 'Custom theme object to apply to the icon',
    },
  },
  args: {
    iconName: 'Accessibility',
    color: 'icon',
    size: 'medium',
    theme: base,
  },
  // tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<IconArgs>;

export const Default: Story = {};

export const CustomTheme: Story = {
  args: {
    theme: customTheme,
  },
  argTypes: {
    color: { 
      control: { type: 'select' },
      options: Object.keys(customTheme.global.colors),
    },
    size: { 
      control: { type: 'select' },
      options: Object.keys(customTheme.icon.size),
    },
  },
};

