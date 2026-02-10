import type { Meta, StoryObj } from '@storybook/react';
import { SelectMultiple } from 'grommet';
import {
  a11yTitleArg,
  disabledArg,
  textSizesArg,
  placeholderArg,
  widthArg,
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
    width: widthArg,
  },
} satisfies Meta<typeof SelectMultiple>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'SelectMultiple',
  render: args => <SelectMultiple {...args} />,
  args: {
    a11yTitle: 'Multiple selection',
    defaultValue: undefined,
    disabled: false,
    open: false,
    options: ['small', 'medium', 'large', 'xlarge'],
    placeholder: 'Select multiple options...',
    size: 'medium',
    width: 'medium',
  },
} satisfies Story;
