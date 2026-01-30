import React from 'react';
import { Anchor, Box } from 'grommet';
import {
  disabledArg,
  labelArg,
  gapArg,
  tShirtSizes,
  iconArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Anchor',
  component: Anchor,
  argTypes: {
    disabled: disabledArg,
    gap: gapArg,
    icon: iconArg,
    label: labelArg,
    size: {
      control: { type: 'select' },
      options: tShirtSizes,
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
      <Box pad="medium">
        <Anchor
          href="#"
          icon={IconComponent ? <IconComponent /> : undefined}
          label={label}
          {...anchorProps}
        />
      </Box>
    );
  },
  args: {
    pad: 'medium',
    label: 'Link',
  },
  name: 'Anchor',
};
