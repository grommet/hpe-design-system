import React from 'react';
import { EmptyState } from 'library';
import { Button } from 'grommet';
import { CircleInformation } from 'grommet-icons';

export const EmptyStateExample = () => {
  return (
    <EmptyState
      title="No items exist"
      description={`Once an item is created, 
        it will be displayed here.`}
      icon={<CircleInformation />}
      actions={<Button label="New item" primary />}
      level={2}
    />
  );
};
