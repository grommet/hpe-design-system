import React from 'react';
import type { StoryObj } from '@storybook/react';
import { SelectMultiple, SelectMultipleProps } from 'grommet';
import {
  a11yTitleArg,
  disabledArg,
  textSizesArg,
  placeholderArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/SelectMultiple',
  component: SelectMultiple,
  argTypes: {
    a11yTitle: a11yTitleArg,
    defaultValue: {
      control: { type: 'object' },
    },
    disabled: disabledArg,
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
  render: (args: SelectMultipleProps) => {
    return <SelectMultiple {...args} />;
  },
  args: {
    a11yTitle: 'Multiple selection',
    defaultValue: undefined,
    disabled: false,
    open: false,
    options: ['small', 'medium', 'large', 'xlarge'],
    placeholder: 'Select multiple options...',
    size: 'medium',
  },
  name: 'SelectMultiple',
};
