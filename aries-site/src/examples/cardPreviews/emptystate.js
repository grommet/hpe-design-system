import React from 'react';
import { Box, Button, Heading, Paragraph } from 'grommet';
import { CircleInformation } from 'grommet-icons';

export const EmptyStatePreview = () => (
  <Box gap="small" align="center" flex={false}>
    <CircleInformation />
    <Box align="center" gap="xsmall">
      <Heading margin="none" size='small' level={4}>
        No items exist
      </Heading>
      <Paragraph margin="none" textAlign="center">
        Error message will be displayed here.
      </Paragraph>
    </Box>
    <Button label="Action item" primary />
  </Box>
);
