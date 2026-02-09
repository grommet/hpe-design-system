import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup } from 'grommet';

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  argTypes: {
    multiple: {
      control: { type: 'object' },
    },
    options: {
      control: { type: 'object' },
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: args => {
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
} satisfies Story;
