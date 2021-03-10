import React from 'react';
import { Box, Button, Tip, Text } from 'grommet';

export const ToolTipSimpleExample = () => (
    <Tip
      content={
        <Box width={{ max: 'small' }} round="xsmall">
          <Text>This is a Tooltip</Text>
        </Box>
      }
    >
      <Button a11yTitle="simple button" label="Button" />
    </Tip>
  );
