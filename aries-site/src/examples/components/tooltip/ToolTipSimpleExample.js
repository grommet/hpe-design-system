import React from 'react';
import { Box, Button, Tip, Text } from 'grommet';

export const ToolTipSimpleExample = () => (
  <Tip
    content={
      <Box width={{ max: 'small' }} round="xsmall">
        <Text>This is a Tip</Text>
      </Box>
    }
  >
    <Button a11yTitle="simple button" label="Hover to see Tip" secondary />
  </Tip>
);
