import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from 'grommet';
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
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Skeleton',
  render: args => <Skeleton {...args} />,
  args: {
    a11yTitle: 'Loading content',
    height: 'xxsmall',
    pad: undefined,
    round: 'xsmall',
    width: 'medium',
  },
} satisfies Story;
