/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Text } from 'grommet';

export const GraphExample = ({ color }) => {
  return (
    <Box align="center" key={color.name} gap="small">
      <Box
        background={color.value}
        height="xxsmall"
        width="xxsmall"
        round="small"
      />
      <Box align="center" gap="xsmall">
        <Text weight={500} size="small">
          {color.name}
        </Text>
        <Text size="small">{color.value}</Text>
      </Box>
    </Box>
  );
};
