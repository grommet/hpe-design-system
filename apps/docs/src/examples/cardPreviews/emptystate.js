import React from 'react';
import { EmptyState } from '@shared/aries-core';
import { Button, Box } from 'grommet';
import { Info } from '@hpe-design/icons-grommet';
import { useInert } from '@shared/hooks';


export const EmptyStatePreview = () => {
  const ref = useInert();

  return (
    <Box ref={ref} pad="small">
      <EmptyState
        title="Empty state title"
        description="Empty state message will be displayed here."
        icon={<Info />}
        actions={
          <Button label="action item" primary size="small" />
        }
        level={4}
      />
    </Box>
  );
};
