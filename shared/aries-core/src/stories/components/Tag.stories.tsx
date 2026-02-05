import React from 'react';
import { Tag, TagProps } from 'grommet';
import type { StoryObj } from '@storybook/react';
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
    onClick: {
      type: 'function',
      control: false,
    },
    size: textSizesArg,
    value: labelArg,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: TagProps) => <Tag {...args} />,
  args: {
    name: 'name',
    value: 'value',
    size: 'small',
  },
  name: 'Tag',
};
