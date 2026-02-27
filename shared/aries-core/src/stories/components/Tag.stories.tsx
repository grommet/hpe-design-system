import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from 'grommet';
import { labelArg, textSizesArg, backgroundArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    background: backgroundArg,
    name: labelArg,
    size: textSizesArg,
    value: labelArg,
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Tag',
  render: args => <Tag {...args} />,
  args: {
    background: undefined,
    name: 'name',
    size: 'small',
    value: 'value',
  },
} satisfies Story;
