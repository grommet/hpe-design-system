import React from 'react';
import { Box, Notification } from 'grommet';

export const BannerNotificationDoExample = () => (
  <Box pad="small">
    <Notification
      message="Your subscription will be ending in 7 days (03/03/2022)."
      onClose={() => {}}
      status="warning"
      actions={[
        {
          href: '#',
          label: 'Renew',
        },
      ]}
    />
  </Box>
);
