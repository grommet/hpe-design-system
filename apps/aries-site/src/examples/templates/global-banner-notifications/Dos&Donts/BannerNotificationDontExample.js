import React from 'react';
import { Notification } from 'grommet';

export const BannerNotificationDontExample = () => (
  <Notification
    status="warning"
    global
    actions={[
      {
        href: '#',
        label: 'Renew',
      },
      {
        href: '#',
        label: 'Compare subscription plans',
      },
      {
        href: '#',
        label: 'View more',
      },
    ]}
    message="Your subscription is expiring in 7 days.
       Access to features a, b, c, and d will be restricted 
      starting on 03/03/2022."
    onClose={() => {}}
  />
);
