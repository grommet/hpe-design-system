import React from 'react';
import { Box, Button, Paragraph, Tip, Text } from 'grommet';
import { Close } from 'grommet-icons';

export const TipExitExample = () => (
  <Box gap="small" direction="row" align="start">
    <Box width="small">
      <Text color="text-strong" size="large" weight="bold">
        Add service
      </Text>
      <Paragraph margin="none">
        Visit the HPE catalog to start adding all of your favorite services.
      </Paragraph>
    </Box>
    <Button a11yTitle="close" icon={<Close />} tip="Close" />
  </Box>
);
