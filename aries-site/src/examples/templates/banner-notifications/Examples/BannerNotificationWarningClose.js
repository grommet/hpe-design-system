import React from 'react';
import { Notification } from 'grommet';

export const BannerNotificationWarningClose = () => (
  <Notification
    actions={[
      {
        href: '#',
        label: 'Renew',
      },
    ]}
    status="warning"
    onClose={() => {}}
    message="Your subscription will be ending in 7 days (03/03/2022)."
  />
);
