import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Icons/Grommet icons',
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

const Icon = {
  render: () => (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
        fill="currentColor"
      />
    </svg>
  ),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Grommet: Story = {
  ...Icon,
};

