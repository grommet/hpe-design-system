import React from 'react';
import { Notification } from 'grommet';

export const BannerNotificationWarning = () => (
  <Notification
    // onClose={() => {}}
    status="warning"
    message={`Your subscription is expiring in 7 days. Renew your 
              subscription to ensure you don't have any interruptions to your 
              access.`}
  />
);
