import React from 'react';
import { Box, Image, Text } from 'grommet';

export const ProductHightlight = ({ icon, desc, title }) => {
  return (
    <Box align="center" gap="medium">
      {icon}
      <Text textAlign="center" size="large">
        {title}
      </Text>
      <Text>{desc}</Text>
    </Box>
  );
};
