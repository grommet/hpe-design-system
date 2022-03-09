import React from 'react';
import { Notification } from 'grommet';

export const BannerNotificationCritical = () => (
  <Notification
    status="critical"
    global
    message="This service is currently down for maintenance. Check back soon."
  />
);
