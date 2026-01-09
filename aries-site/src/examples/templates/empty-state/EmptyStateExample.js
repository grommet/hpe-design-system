import React from 'react';
import { EmptyState } from '@shared/aries-core';
import { Button } from 'grommet';
import { Info } from '@hpe-design/icons-grommet';

export const EmptyStateExample = () => {
  return (
    <EmptyState
      title="No items exist"
      description={`Once an item is created, 
        it will be displayed here.`}
      icon={<Info />}
      actions={<Button label="New item" primary />}
      level={2}
    />
  );
};
