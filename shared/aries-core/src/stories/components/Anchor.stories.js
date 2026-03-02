import React from 'react';
import { Anchor } from 'grommet';
import {
  disabledArg,
  labelArg,
  textSizesArg,
  reverseArg,
  iconArg,
  a11yTitleArg,
} from '../utils/commonArgs';

export const anchorArgTypes = {
  a11yTitle: a11yTitleArg,
  disabled: disabledArg,
  icon: iconArg,
  label: labelArg,
  href: {
    control: { type: 'text' },
  },
  size: textSizesArg,
  reverse: reverseArg,
};

const meta = {
  title: 'Components/Anchor',
  component: Anchor,
  argTypes: anchorArgTypes,
};

export default meta;

export const Default = {
  render: args => {
    return <Anchor {...args} />;
  },
  args: {
    label: 'Link',
    href: '#',
    a11yTitle: 'Navigate to link',
  },
  name: 'Anchor',
};
