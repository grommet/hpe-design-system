import React from 'react';
import { Box, Notification } from 'grommet';

export const BannerNotificationWarning = () => (
  <Box width="large">
    <Notification
      actions={[
        {
          href: '#',
          label: 'Refresh',
        },
      ]}
      status="warning"
      global
      message="Your session has timed out due to inactivity."
    />
  </Box>
);
