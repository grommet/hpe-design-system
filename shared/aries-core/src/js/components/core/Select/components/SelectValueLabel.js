import React from 'react';
import { Box, Text } from 'grommet';
import { Cpu } from '@hpe-design/icons-grommet';

const SelectValueLabel = ({ option, optionPad }) => {
  if (!option) {
    return (
      <Box
        responsive={false}
        direction="row"
        align="center"
        gap="small"
        pad={optionPad}
      >
        <Cpu size="small" color="text-weak" />
        <Text color="text-weak">Select a service</Text>
      </Box>
    );
  }

  const Icon = option.icon;

  return (
    <Box
      responsive={false}
      direction="row"
      align="center"
      gap="small"
      pad={optionPad}
    >
      <Box responsive={false} direction="row" align="center" gap="xsmall">
        <Cpu size="small" />
        <Text>{option.label}</Text>
        <Icon size="small" color={option.iconColor} />
      </Box>
    </Box>
  );
};

export { SelectValueLabel };
