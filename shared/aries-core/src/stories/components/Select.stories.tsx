import type { Meta, StoryObj } from '@storybook/react';
import { Select } from 'grommet';
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
    open: {
      control: { type: 'boolean' },
    },
    options: {
      control: { type: 'object' },
    },
    placeholder: placeholderArg,
    size: textSizesArg,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Select',
  render: args => <Select {...args} />,
  args: {
    a11yTitle: undefined,
    clear: false,
    defaultValue: '',
    disabled: false,
    name: 'select',
    open: false,
    options: ['small', 'medium', 'large'],
    placeholder: 'Select an option...',
    size: 'medium',
  },
} satisfies Story;
