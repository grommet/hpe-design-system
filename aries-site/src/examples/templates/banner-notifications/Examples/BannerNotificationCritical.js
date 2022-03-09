import React from 'react';
import { Box, Notification } from 'grommet';

export const BannerNotificationCritical = () => (
  <Box width='large'>
    <Notification
      status="critical"
      global
      message="This service is currently down for maintenance. Check back soon."
    />
  </Box>
);
