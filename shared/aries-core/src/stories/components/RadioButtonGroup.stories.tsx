import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioButtonGroup } from 'grommet';
import { disabledArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/RadioButtonGroup',
  component: RadioButtonGroup,
  argTypes: {
    disabled: disabledArg,
    options: {
      control: { type: 'object' },
    },
  },
} satisfies Meta<typeof RadioButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'RadioButtonGroup',
  render: args => <RadioButtonGroup {...args} />,
  // @ts-ignore in grommet name is required but for the story we don't need it
  args: {
    disabled: false,
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
} satisfies Story;
