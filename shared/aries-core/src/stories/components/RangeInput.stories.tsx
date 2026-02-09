import React, { useState } from 'react';
import type { StoryObj } from '@storybook/react';
import { RangeInput, RangeInputExtendedProps } from 'grommet';
import { a11yTitleArg, disabledArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/RangeInput',
  component: RangeInput,
  argTypes: {
    a11yTitle: a11yTitleArg,
    disabled: disabledArg,
    max: {
      control: { type: 'number' },
    },
    min: {
      control: { type: 'number' },
    },
    name: {
      control: { type: 'text' },
    },
    onChange: {
      action: 'changed',
    },
    step: {
      control: { type: 'number' },
    },
    value: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: RangeInputExtendedProps) => {
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
  },
  args: {
    a11yTitle: 'Select range value',
    disabled: false,
    max: 100,
    min: 0,
    name: 'rangeInput',
    step: 1,
    value: 50,
  },
  name: 'RangeInput',
};
