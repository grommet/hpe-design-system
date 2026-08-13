import React from 'react';
import { Box, Text } from 'grommet';

const SelectOptionLabel = ({ icon: Icon, label, iconColor = 'icon' }) => (
  <Box direction="row" align="center" gap="small">
    <Icon size="small" color={iconColor} />
    <Text>{label}</Text>
  </Box>
);

export { SelectOptionLabel };
