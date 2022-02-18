import React from 'react';
import { Box, Notification } from 'grommet';

export const BannerNotificationWarning = () => (
  <Box pad="small">
    <Notification
      // href="#"
      status="warning"
      message={`Your subscription is expiring in 7 days. Renew your 
              subscription to ensure you don't have any interruptions to your 
              access.`}
      // onClose={() => {}}
    />
  </Box>
);
