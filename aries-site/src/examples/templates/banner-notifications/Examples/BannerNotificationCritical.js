import React from 'react';
import { Box, Notification } from 'grommet';

export const BannerNotificationCritical = () => (
  <Box pad="small">
    <Notification
      // href="#"
      status="critical"
      message={`Scheduled Maintenance
       on 02/21/2022 at 12:00UTC. system unavailable for 2 hours.`}
      // onClose={() => {}}
    />
  </Box>
);
