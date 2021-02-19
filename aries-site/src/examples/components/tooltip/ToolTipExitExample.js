import React from 'react';
import { Box, Button, Tip, Text, Heading } from 'grommet';
import { FormClose } from 'grommet-icons';

export const ToolTipExitExample = () => {
  return (
    <Box align="center" justify="center" fill>
      <Box gap="xsmall" round="xsmall">
        <Box justify="between" direction="row">
          <Heading level={4} size="small" margin="none">
            Add Service
          </Heading>
          <Tip dropProps={{ align: { left: 'right' } }} content="Close">
            <Button icon={<FormClose />} />
          </Tip>
        </Box>
        <Box width="small">
          <Text>
            Visit the HPE catalog to start addiing all of your favoriite
            service.{' '}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
