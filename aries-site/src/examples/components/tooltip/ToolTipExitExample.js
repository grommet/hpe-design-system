import React from 'react';
import { Box, Button, Tip, Text } from 'grommet';
import { FormClose } from 'grommet-icons';

export const ToolTipExitExample = () => {
  return (
    <Box align="center" justify="center" fill>
      <Box align="start" justify="between" direction="row">
        <Text color="text-strong" size="large" weight="bold">
          Add Service
        </Text>
        <Tip content="Close">
          <Button icon={<FormClose />} />
        </Tip>
      </Box>
      <Box width="small">
        <Text>
          Visit the HPE catalog to start addiing all of your favoriite services.
        </Text>
      </Box>
    </Box>
  );
};
