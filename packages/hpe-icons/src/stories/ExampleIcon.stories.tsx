import type { Meta, StoryObj } from '@storybook/react';

// Example Icon component - this will be replaced with actual HPE icons
const ExampleIcon = ({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
      fill={color}
    />
  </svg>
);

const meta: Meta<typeof ExampleIcon> = {
  title: 'Icons/ExampleIcon',
  component: ExampleIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An example icon component demonstrating the HPE Icons Storybook setup. This will be replaced with actual HPE icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 12, max: 48, step: 4 },
      description: 'Size of the icon in pixels',
    },
    color: {
      control: { type: 'color' },
      description: 'Color of the icon',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 24,
    color: '#000000',
  },
};

export const Large: Story = {
  args: {
    size: 48,
    color: '#000000',
  },
};

export const Colored: Story = {
  args: {
    size: 32,
    color: '#0073e6',
  },
};

export const Small: Story = {
  args: {
    size: 16,
    color: '#666666',
  },
};