import React from 'react';
import { Notification } from 'grommet';

export function BannerNotificationWarning() {
  return <Notification
    actions={[
      {
        href: '#',
        label: 'Refresh',
      },
    ]}
    status="warning"
    global
    message="Your session has timed out due to inactivity."
  />;
}
