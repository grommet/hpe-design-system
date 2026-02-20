import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from 'grommet';
import {
  labelArg,
  textSizesArg,
  a11yTitleArg,
  backgroundArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    a11yTitle: a11yTitleArg,
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
    a11yTitle: undefined,
    background: undefined,
    name: 'name',
    size: 'small',
    value: 'value',
  },
} satisfies Story;
