import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Anchor, AnchorType } from 'grommet';
import {
  disabledArg,
  labelArg,
  textSizesArg,
  reverseArg,
  iconArg,
  a11yTitleArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Anchor',
  component: Anchor,
  argTypes: {
    a11yTitle: a11yTitleArg,
    disabled: disabledArg,
    icon: iconArg,
    label: labelArg,
    href: {
      control: { type: 'text' },
    },
    size: textSizesArg,
    reverse: reverseArg,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: AnchorType) => {
    return <Anchor {...args} />;
  },
  args: {
    label: 'Link',
    href: '#',
    a11yTitle: 'Navigate to link',
  },
  name: 'Anchor',
};
