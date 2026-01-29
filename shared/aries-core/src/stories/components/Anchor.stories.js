import React from 'react';
import { Anchor, Box } from 'grommet';
import {
  alignArg,
  disabledArg,
  labelArg,
  weightArg,
  gapArg,
  tShirtSizes,
  iconArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Anchor',
  component: Anchor,
  argTypes: {
    align: alignArg,
    disabled: disabledArg,
    gap: gapArg,
    icon: iconArg,
    label: labelArg,
    size: tShirtSizes,
    weight: weightArg,
    reverse: {
      control: { type: 'boolean' },
      options: [true, false],
    },
  },
};

export default meta;

export const Default = {
  render: args => {
    const { pad, icon, label, ...anchorProps } = args;
    const IconComponent = icon;
    return (
      <Box pad={pad}>
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
