import React from 'react';
import { Box, Text } from 'grommet';

const SelectOptionLabel = ({
  icon: Icon,
  label,
  iconColor = 'icon',
  ...rest
}) => (
  <Box responsive={false} direction="row" align="center" gap="xsmall" {...rest}>
    <Icon size="small" color={iconColor} />
    <Text>{label}</Text>
  </Box>
);

export { SelectOptionLabel };
