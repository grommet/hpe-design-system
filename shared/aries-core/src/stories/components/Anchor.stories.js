import React from 'react';
import { Anchor, Box } from 'grommet';
import {
  alignArg,
  disabledArg,
  labelArg,
  weightArg,
  gapArg,
  tShirtSizes,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Anchor',
  component: Anchor,
  argTypes: {
    align: alignArg,
    disabled: disabledArg,
    gap: gapArg,
    // icon: iconArg,
    label: labelArg,
    size: tShirtSizes,
    weight: weightArg,
  },
};

export default meta;

export const Default = {
  render: args => (
    <Box {...args}>
      <Anchor href="#">Link</Anchor>
    </Box>
  ),
  args: {
    pad: 'medium',
  },
  name: 'Anchor',
};
