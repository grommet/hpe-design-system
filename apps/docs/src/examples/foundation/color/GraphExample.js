/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Text } from 'grommet';

export const GraphExample = ({ color }) => {
  return (
    <Box align="center" key={color.name} gap="xsmall">
      <Box
        background={color.value}
        height="5xsmall"
        width="5xsmall"
        round="medium"
      />
      <Box align="center">
        <Text weight={500} size="small">
          {color.name}
        </Text>
        <Text size="small">{color.value}</Text>
      </Box>
    </Box>
  );
};
