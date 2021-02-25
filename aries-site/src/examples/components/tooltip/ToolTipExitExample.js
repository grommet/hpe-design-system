import React from 'react';
import { Box, Button, Tip, Text } from 'grommet';
import { FormClose } from 'grommet-icons';

export const ToolTipExitExample = () => {
  return (
    <Box gap="small" direction="row">
      <Box width="small">
        <Text color="text-strong" size="large" weight="bold">
          Add Service
        </Text>
        <Text>
          Visit the HPE catalog to start addiing all of your favoriite services.
        </Text>
      </Box>
      <Box>
        <Tip content="Close">
          <Button a11yTitle="close" icon={<FormClose />} />
        </Tip>
      </Box>
    </Box>
  );
};
