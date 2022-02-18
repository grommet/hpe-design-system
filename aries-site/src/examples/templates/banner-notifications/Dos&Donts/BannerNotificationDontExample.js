import React from 'react';
import { Box, Notification } from 'grommet';

export const BannerNotificationDontExample = () => (
  <Box pad="small">
    <Notification
      // href="#"
      status="critical"
      message={`Scheduled Maintenance on
       02/21/2022 at 12:00UTC. system unavailable for 2 hours.`}
      // onClose={() => {}}
    />
    <Notification
      // href="#"
      status="warning"
      message='Your subscription is expiring in 7 days.'
      // onClose={() => {}}
    />
  </Box>
);
