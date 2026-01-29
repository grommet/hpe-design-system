import React from 'react';
import { Button } from 'grommet';
import { Lock } from '@hpe-design/icons-grommet';
import { EmptyState } from '@shared/aries-core';

export const AccessDenied = () => {
  return (
    <EmptyState
      title="Access denied"
      description={`You do not have access to this resource. 
    Please contact the administrator to request access.`}
      icon={<Lock />}
      actions={<Button label="Request access" primary />}
      level={2}
    />
  );
};
