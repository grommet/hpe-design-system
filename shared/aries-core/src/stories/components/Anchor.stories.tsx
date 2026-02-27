import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Anchor, AnchorType } from 'grommet';
import {
  disabledArg,
  labelArg,
  textSizesArg,
  reverseArg,
  iconArg,
  ariaLabelArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Anchor',
  component: Anchor,
  argTypes: {
    'aria-label': ariaLabelArg,
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
    'aria-label': 'Navigate to link',
    href: '#',
    label: 'Link',
  },
  name: 'Anchor',
};
