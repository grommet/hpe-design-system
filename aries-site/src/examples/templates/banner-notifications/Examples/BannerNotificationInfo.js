import React from 'react';
import { Box, Notification } from 'grommet';

export const BannerNotificationInfo = () => (
  <Box pad="small">
    <Notification
      // href="#"
      message="Your subscription is expiring in 7 days."
      // onClose={() => {}}
    />
  </Box>
);
