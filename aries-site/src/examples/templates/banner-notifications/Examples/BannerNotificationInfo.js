import React from 'react';
import { Notification } from 'grommet';

export const BannerNotificationInfo = () => (
  <Notification
    status="info"
    onClose={() => {}}
    actions={[
      {
        href: '#',
        label: 'View more',
      },
    ]}
    message="Updates to this service will be available soon
     including feature a, b, and c."
    global
  />
);
