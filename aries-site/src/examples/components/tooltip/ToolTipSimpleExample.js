import React from 'react';
import { Box, Button, Tip, Text } from 'grommet';

export const ToolTipSimpleExample = () => {
  return (
    <Box align="center" justify="center" fill>
      <Tip
        content={
          <Box width={{ max: 'small' }} round="xsmall">
            <Text>This is a Tooltip</Text>
          </Box>
        }
      >
        <Button a11yTitle="simple button" label="Button" />
      </Tip>
    </Box>
  );
};
