import React from 'react';
import { Box, Button, Tip, Text } from 'grommet';
import { FormClose } from 'grommet-icons';

export const ToolTipExitExample = () => {
  return (
    <Box align="start" justify="center" fill>
      <Box justify="between" direction="row">
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
