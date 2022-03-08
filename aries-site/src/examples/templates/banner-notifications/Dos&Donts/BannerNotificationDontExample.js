import React from 'react';
import { Box, Notification } from 'grommet';

export const BannerNotificationDontExample = () => (
  <Box pad="small">
    <Notification
      status="critical"
      actions={[
        {
          href: '#',
          label: 'Renew',
        },
        {
          href: '#',
          label: 'Compare Subscription plans',
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
  </Box>
);
