import React from 'react';
import { EmptyState } from 'aries-core';
import { Button, Box } from 'grommet';
import { Info } from '@hpe-design/icons-grommet';

export const EmptyStatePreview = () => {
  return (
    <Box pad="small">
      <EmptyState
        title="Empty state title"
        description="Empty state message will be displayed here."
        icon={<Info />}
        actions={
          <Button tabIndex={-1} label="action item" primary size="small" />
        }
        level={4}
      />
    </Box>
  );
};
