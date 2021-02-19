import React from 'react';
import { Box, Tip, Text } from 'grommet';

export const ToolTipDefinitionExample = () => {
  return (
    <Box gap="small" align="center" justify="center" fill>
      <Text size="large">
        The HPE Design System team is{' '}
        <Tip
          dropProps={{ align: { bottom: 'top' } }}
          content={
            <Box align="center">
              <Text>feeling dedication and loyalty to a cause</Text>
            </Box>
          }
        >
          committed
        </Tip>{' '}
        to conducting thorough research so you don't have to think about it.
        Just find what you need, design and deliver quickly!
      </Text>
    </Box>
  );
};
