import React from 'react';
import { Notification } from 'grommet';

export const BannerNotificationWarning = () => (
  <Notification
    status="warning"
    message={`Your subscription is expiring in 7 days. Renew your 
              subscription to ensure you don't have any interruptions to your 
              access.`}
  />
);
