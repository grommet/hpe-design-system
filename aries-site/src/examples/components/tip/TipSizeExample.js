import React from 'react';
import { Box, Button, Tip, Text } from 'grommet';

export const TipSizeExample = () => (
  <Box gap="xlarge">
    <Tip
      content={
        <Box width={{ max: 'xsmall' }} round="xsmall">
          <Text>This is a tip</Text>
        </Box>
      }
    >
      <Button a11yTitle="small tip" label="Small tip" secondary />
    </Tip>
    <Tip
      content={
        <Box width={{ max: 'xsmall' }} round="xsmall">
          <Text>
            This is a larger tip which displays more content upon hover or
            focus.
          </Text>
        </Box>
      }
    >
      <Button a11yTitle="large tip" label="Large tip" secondary />
    </Tip>
  </Box>
);
