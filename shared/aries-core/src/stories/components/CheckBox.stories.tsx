import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckBox } from 'grommet';
import {
  labelArg,
  ariaLabelArg,
  disabledArg,
  fillArg,
  padArg,
  reverseArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/CheckBox',
  component: CheckBox,
  argTypes: {
    'aria-label': ariaLabelArg,
    checked: {
      control: { type: 'boolean' },
    },
    disabled: disabledArg,
    fill: fillArg,
    indeterminate: {
      control: { type: 'boolean' },
    },
    label: labelArg,
    pad: padArg,
    reverse: reverseArg,
    toggle: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof CheckBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'CheckBox',
  render: args => <CheckBox {...args} />,
  args: {
    'aria-label': undefined,
    checked: false,
    disabled: false,
    fill: false,
    indeterminate: false,
    label: 'CheckBox',
    pad: undefined,
    reverse: false,
    toggle: false,
  },
} satisfies Story;
