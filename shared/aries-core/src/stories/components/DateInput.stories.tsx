import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, DateInput } from 'grommet';
import { reverseArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/DateInput',
  component: DateInput,
  argTypes: {
    format: {
      control: { type: 'text' },
    },
    inline: {
      control: { type: 'boolean' },
    },
    readOnlyCopy: {
      control: { type: 'boolean' },
    },
    reverse: reverseArg,
  },
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'DateInput',
  render: args => (
    <Box>
      <DateInput {...args} />
    </Box>
  ),
  args: {
    format: 'mm/dd/yyyy',
    inline: false,
    readOnlyCopy: false,
    reverse: false,
  },
} satisfies Story;
