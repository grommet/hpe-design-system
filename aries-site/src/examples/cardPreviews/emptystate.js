import React from 'react';
import { EmptyState } from 'aries-core';
import { Button } from 'grommet';
import { CircleInformation } from 'grommet-icons';

export const EmptyStatePreview = () => {
  return (
    <EmptyState
      title="Empty state title"
      description="Empty state message will be displayed here."
      icon={<CircleInformation />}
      actions={<Button tabIndex={-1} label="action item" primary />}
      level={3}
    />
  );
};
