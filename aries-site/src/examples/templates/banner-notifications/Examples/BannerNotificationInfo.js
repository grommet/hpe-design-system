import React from 'react';
import { Box, Notification } from 'grommet';

export const BannerNotificationInfo = () => (
  <Box fill="horizontal">
    <Notification
      onClose={() => {}}
      actions={[
        {
          href: '#',
          label: 'View more',
        },
      ]}
      message="Updates to this service will be available soon
     including feature a, b, and c."
    />
  </Box>
);
