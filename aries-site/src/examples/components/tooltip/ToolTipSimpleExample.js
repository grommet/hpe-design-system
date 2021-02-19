import React from 'react';
import { Box, Button, Tip, Text } from 'grommet';

export const ToolTipSimpleExample = () => {
  return (
    <>
      <Box align="center" justify="center" fill>
        <Tip
          content={
            <Box
              width={{ max: 'small' }}
              round="xsmall"
            >
              <Text>This is a ToolTip</Text>
            </Box>
          }
        >
          <Button label="Button" />
        </Tip>
      </Box>
    </>
  );
};
