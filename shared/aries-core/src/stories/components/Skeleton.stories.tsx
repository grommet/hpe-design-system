import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Skeleton, SkeletonProps } from 'grommet';
import {
  a11yTitleArg,
  heightArg,
  padArg,
  roundArg,
  widthArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    a11yTitle: a11yTitleArg,
    height: heightArg,
    pad: padArg,
    round: roundArg,
    width: widthArg,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: SkeletonProps) => {
    return <Skeleton {...args} />;
  },
  args: {
    a11yTitle: 'Loading content',
    height: 'xxsmall',
    pad: undefined,
    round: 'xsmall',
    width: 'medium',
  },
  name: 'Skeleton',
};
