import React from 'react';
import { Notification } from 'grommet';

export const BannerNotificationCritical = () => (
  <Notification
    status="critical"
    global
    message={`This service is currently unavailable. We are working on getting 
    things fixed.`}
  />
);
