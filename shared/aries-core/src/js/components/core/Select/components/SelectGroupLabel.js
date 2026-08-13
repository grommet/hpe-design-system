import React from 'react';
import { Box, Text } from 'grommet';

const SelectGroupLabel = ({ label, optionPad }) => (
  <Box
    role="presentation"
    pad={{
      top: 'xxsmall',
      bottom: '5xsmall',
      left: optionPad?.left || optionPad?.horizontal,
    }}
  >
    <Text
      size="xsmall"
      weight="bold"
      color="text-strong"
      role="heading"
      aria-level={3}
    >
      {label}
    </Text>
  </Box>
);

export { SelectGroupLabel };
