import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from 'grommet';
import {
  ariaLabelArg,
  heightArg,
  marginArg,
  padArg,
  roundArg,
  widthArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    height: heightArg,
    margin: marginArg,
    pad: padArg,
    round: roundArg,
    width: widthArg,
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Skeleton',
  render: args => <Skeleton {...args} />,
  args: {
    height: 'xxsmall',
    margin: 'small',
    pad: 'small',
    round: 'xsmall',
    width: 'medium',
  },
} satisfies Story;
