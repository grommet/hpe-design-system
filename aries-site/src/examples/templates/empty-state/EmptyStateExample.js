import React from 'react';
import { EmptyState } from 'aries-core';
import { Button } from 'grommet';
import { CircleInformation } from 'grommet-icons';

export const EmptyStateExample = () => {
  return (
    <EmptyState
      title="No items exist"
      description={`Once an item is created, 
        it will be displayed here.`}
      icon={<CircleInformation size="xlarge" />}
      actions={<Button label="Create item" primary />}
      level={2}
    />
  );
};
