import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileInput } from 'grommet';
import { disabledArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/FileInput',
  component: FileInput,
  argTypes: {
    'aria-label': {
      control: { type: 'text' },
    },
    disabled: disabledArg,
    maxSize: {
      control: { type: 'number' },
    },
    multiple: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'FileInput',
  render: args => <FileInput {...args} />,
  args: {
    'aria-label': 'Choose a file',
    disabled: false,
    maxSize: undefined,
    multiple: false,
  },
} satisfies Story;
