import React from 'react';
import type { StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupExtendedProps } from 'grommet';

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  argTypes: {
    multiple: {
      control: { type: 'boolean' },
    },
    options: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: ToggleGroupExtendedProps) => {
    return <ToggleGroup {...args} />;
  },
  args: {
    multiple: false,
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
  },
  name: 'ToggleGroup',
};
