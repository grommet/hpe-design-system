import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MaskedInput } from 'grommet';
import { iconArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/MaskedInput',
  component: MaskedInput,
  argTypes: {
    icon: iconArg,
    mask: {
      control: { type: 'object' },
    },
    reverse: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof MaskedInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'MaskedInput',
  render: args => <MaskedInput {...args} />,
  args: {
    icon: undefined,
    mask: [
      {
        regexp: /^[\w\-_.]+$/,
        placeholder: 'example',
      },
      { fixed: '@' },
      {
        regexp: /^[\w]+$/,
        placeholder: 'my',
      },
      { fixed: '.' },
      {
        regexp: /^[\w]+$/,
        placeholder: 'com',
      },
    ],
    reverse: false,
  },
} satisfies Story;
