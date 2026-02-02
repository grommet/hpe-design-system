import React from 'react';
import { Anchor } from 'grommet';
import { disabledArg, labelArg, textSizes, iconArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/Anchor',
  component: Anchor,
  argTypes: {
    disabled: disabledArg,
    icon: iconArg,
    label: labelArg,
    href: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'select' },
      options: textSizes,
    },
    reverse: {
      control: { type: 'boolean' },
      options: [true, false],
    },
  },
};

export default meta;

export const Default = {
  render: args => {
    const { icon, label, ...anchorProps } = args;
    const IconComponent = icon;
    return (
      <Anchor
        href="#"
        icon={IconComponent ? <IconComponent /> : undefined}
        label={label}
        a11yTitle="Navigate to link"
        {...anchorProps}
      />
    );
  },
  args: {
    label: 'Link',
  },
  name: 'Anchor',
};
