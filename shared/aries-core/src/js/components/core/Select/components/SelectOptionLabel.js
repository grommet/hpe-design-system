import React from 'react';
import { Box, Text } from 'grommet';

const SelectOptionLabel = ({ icon: Icon, label, iconColor = 'icon' }) => (
  <Box responsive={false} direction="row" align="center" gap="xsmall">
    <Icon size="small" color={iconColor} />
    <Text>{label}</Text>
  </Box>
);

export { SelectOptionLabel };
