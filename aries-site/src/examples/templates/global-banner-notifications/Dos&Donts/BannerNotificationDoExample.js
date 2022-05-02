import React from 'react';
import { Notification } from 'grommet';

export function BannerNotificationDoExample() {
  return <Notification
      message="Your subscription will be ending in 7 days (03/03/2022)."
      onClose={() => {}}
      global
      status="warning"
      actions={[
        {
          href: '#',
          label: 'Renew',
        },
      ]}
    />;
}
