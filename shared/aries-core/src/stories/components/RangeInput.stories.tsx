import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RangeInput } from 'grommet';
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
    onChange: {
      action: 'changed',
    },
    step: {
      control: { type: 'number' },
    },
  },
} satisfies Meta<typeof RangeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'RangeInput',
  render: args => {
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
    onChange: undefined,
    step: 1,
  },
} satisfies Story;
