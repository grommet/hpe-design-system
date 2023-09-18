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
            title="Nearing allotted budget."
            message="You've reached 85% of your spending goal."
            actions={[
              {
                label: 'Adjust budget',
                href: '/',
              },
              {
                label: 'View saving ideas',
                href: '/',
              },
            ]}
          />
        }
      />
    </Box>
  );
};
