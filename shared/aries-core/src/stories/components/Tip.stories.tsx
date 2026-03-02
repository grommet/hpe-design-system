import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Tip } from 'grommet';

const meta = {
  title: 'Components/Tip',
  component: Tip,
  argTypes: {
    content: {
      control: { type: 'text' },
    },
    defaultVisible: {
      control: { type: 'boolean' },
    },
    dropProps: {
      control: { type: 'object' },
    },
  },
} satisfies Meta<typeof Tip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Tip',
  render: args => (
    <Tip {...args}>
      <Button
        a11yTitle="simple button"
        label="Hover to see Tip"
        secondary
      />
    </Tip>
  ),
  args: {
    content: 'This is a tip',
    defaultVisible: false,
    dropProps: undefined,
  },
} satisfies Story;
