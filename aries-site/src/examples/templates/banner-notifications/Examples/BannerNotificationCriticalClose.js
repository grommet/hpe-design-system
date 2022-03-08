import React from 'react';
import { Notification } from 'grommet';

export const BannerNotificationCriticalClose = () => (
  <Notification
    status="critical"
    onClose={() => {}}
    message="This service is currently down for maintenance. Check back soon."
  />
);
