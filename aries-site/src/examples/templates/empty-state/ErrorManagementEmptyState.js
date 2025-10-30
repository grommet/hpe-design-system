import React from 'react';
import { EmptyState } from 'aries-core';
import { Button } from 'grommet';
import { Alert } from '@hpe-design/icons-grommet';

export const ErrorManagementEmptyState = ({ ...rest }) => {
  return (
    <EmptyState
      title="Unable to retrieve data"
      description={`Try refreshing the browser window. If the problem 
        persists, please submit a support request.`}
      icon={<Alert color="icon-warning" />}
      actions={<Button label="Submit support request" primary />}
      level={2}
      {...rest}
    />
  );
};
