import React from 'react';
import { Button } from 'grommet';
import { Lock } from 'grommet-icons';
import { EmptyState } from 'aries-core';

export const AccessDenied = () => {
  return (
    <EmptyState
      title="Access denied"
      description={`You do not have access to this resource. 
    Please contact the administrator to request access.`}
      icon={<Lock size="xlarge" />}
      actions={<Button label="Contact administator" primary />}
      level={2}
    />
  );
};
