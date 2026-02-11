import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckBoxGroup } from 'grommet';
import { disabledArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/CheckBoxGroup',
  component: CheckBoxGroup,
  argTypes: {
    disabled: disabledArg,
    options: {
      control: { type: 'object' },
    },
  },
} satisfies Meta<typeof CheckBoxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'CheckBoxGroup',
  render: args => <CheckBoxGroup {...args} />,
  args: {
    disabled: false,
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
} satisfies Story;
