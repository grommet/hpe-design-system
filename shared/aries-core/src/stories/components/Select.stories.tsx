import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from 'grommet';
import {
  ariaLabelArg,
  disabledArg,
  placeholderArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    'aria-label': ariaLabelArg,
    clear: {
      control: { type: 'boolean' },
    },
    disabled: disabledArg,
    open: {
      control: { type: 'boolean' },
    },
    options: {
      control: { type: 'object' },
    },
    placeholder: placeholderArg,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Select',
  render: args => <Select {...args} />,
  args: {
    'aria-label': 'Select a size',
    clear: false,
    disabled: false,
    open: false,
    options: ['small', 'medium', 'large'],
    placeholder: 'Select an option...',
  },
} satisfies Story;
