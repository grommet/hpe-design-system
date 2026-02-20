import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MaskedInput } from 'grommet';
import { iconArg } from '../utils/commonArgs';
import { heightArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/MaskedInput',
  component: MaskedInput,
  argTypes: {
    dropHeight: heightArg,
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
    dropHeight: undefined,
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
