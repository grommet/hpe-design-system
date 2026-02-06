import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Select, SelectProps } from 'grommet';
import {
  a11yTitleArg,
  disabledArg,
  textSizesArg,
  placeholderArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    a11yTitle: a11yTitleArg,
    clear: {
      control: { type: 'boolean' },
    },
    defaultValue: {
      control: { type: 'text' },
    },
    disabled: disabledArg,
    name: {
      control: { type: 'text' },
    },
    onChange: onChangeArg,
    open: {
      control: { type: 'boolean' },
    },
    options: {
      control: { type: 'object' },
    },
    placeholder: placeholderArg,
    size: textSizesArg,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: SelectProps) => {
    return <Select {...args} />;
  },
  args: {
    options: ['small', 'medium', 'large'],
    placeholder: 'Select an option...',
  },
  name: 'Select',
};
