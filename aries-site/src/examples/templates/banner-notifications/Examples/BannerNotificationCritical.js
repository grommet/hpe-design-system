import React from 'react';
import { Notification } from 'grommet';

export const BannerNotificationCritical = () => (
  <Notification
    status="critical"
    message={`Scheduled Maintenance
       on 02/21/2022 at 12:00UTC. system unavailable for 2 hours.`}
    // onClose={() => {}}
  />
);
