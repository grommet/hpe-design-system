import React, { useContext } from 'react';
import { Tile } from 'aries-core';
import { Box, Heading, ResponsiveContext, Text } from 'grommet';
import { IconGuidelines } from '../../../components';

export const BoxExample = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Tile pad="medium" background="green" width="medium">
      <Box
        pad="small"
        gap={size === 'small' ? 'large' : 'medium'}
        align="start"
      >
        <IconGuidelines size="xlarge" />
        <Heading level={2} margin="none" responsive={false}>
          Guidelines
        </Heading>
        <Text size="small">
          This is the ideology and heartbeat of the HPE Design System.
        </Text>
      </Box>
    </Tile>
  );
};
