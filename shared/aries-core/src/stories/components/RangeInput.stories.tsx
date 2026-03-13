import React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { RangeInput } from 'grommet';
import { ariaLabelArg, disabledArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/RangeInput',
  component: RangeInput,
  argTypes: {
    'aria-label': ariaLabelArg,
    disabled: disabledArg,
    max: {
      control: { type: 'number' },
    },
    min: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
  },
} satisfies Meta<typeof RangeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const RangeInputDefault = (args: React.ComponentProps<typeof RangeInput>) => {
  const [value, setValue] = useState(args.value || 50);

  return (
    <RangeInput
      {...args}
      value={value}
      onChange={event => {
        setValue(Number(event.target.value));
        args.onChange?.(event);
      }}
    />
  );
};

export const Default = {
  name: 'RangeInput',
  render: (args: React.ComponentProps<typeof RangeInput>) => (
    <RangeInputDefault {...args} />
  ),

  args: {
    'aria-label': 'Select range value',
    disabled: false,
    max: 100,
    min: 0,
    step: 1,
  },
} satisfies Story;
