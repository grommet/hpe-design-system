import React from 'react';
import { Box, Notification } from 'grommet';

export const BannerNotificationDoExample = () => (
  <Box pad="small">
    <Notification
      // href="#"
      message={`Updates to this service will be available
       soon including feature a, b, and c.`}
      // onClose={() => {}}
    />
  </Box>
);
