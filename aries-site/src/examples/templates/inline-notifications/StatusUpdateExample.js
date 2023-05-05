import React from 'react';
import { Box, Notification } from 'grommet';
import { CostByService } from '../dashboards/content';

export const StatusUpdateExample = () => {
  return (
    <Box width="medium">
      <CostByService
        period="Last 30 Days"
        notification={
          <Notification
            status="warning"
            message="You've reached 95% of your spending goal."
          />
        }
      />
    </Box>
  );
};
