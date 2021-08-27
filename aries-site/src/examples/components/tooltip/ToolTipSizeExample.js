import React from 'react';
import { Box, Button, Tip, Text } from 'grommet';

export const ToolTipSizeExample = () => (
  <Box gap="large">
    <Tip
      content={
        <Box width={{ max: 'small' }} round="xsmall">
          <Text>This is a Tooltip</Text>
        </Box>
      }
    >
      <Button a11yTitle="small tip" label="Small Tip" secondary />
    </Tip>
    <Tip
      content={
        <Box width={{ max: 'small' }} round="xsmall">
          <Text>
            This is a larger tip which displays
            more content upon hover or focus.
          </Text>
        </Box>
      }
    >
      <Button a11yTitle="large tip" label="Large Tip" secondary />
    </Tip>
  </Box>
);
