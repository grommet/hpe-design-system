import React from 'react';
import { Button, Box, Heading, Paragraph } from 'grommet';
import { Info } from '@hpe-design/icons-grommet';

// had to recreate EmptyState here to meet the specific preview needs
// without affecting the existing EmptyState component from aries-core
export const EmptyStatePreview = () => {
  return (
    <Box gap="xsmall" align="center" flex={false}>
      <Info />
      <Box align="center" gap="3xsmall">
        <Heading size="small" margin="none" level={3}>
          Empty state title
        </Heading>
        <Paragraph margin="none" textAlign="center">
          Empty state message will be displayed here.
        </Paragraph>
      </Box>
      <Button size="xsmall" tabIndex={-1} label="action item" primary />
    </Box>
  );
};
