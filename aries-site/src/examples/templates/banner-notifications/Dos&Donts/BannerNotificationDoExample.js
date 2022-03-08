import React from 'react';
import { Box, Notification } from 'grommet';

export const BannerNotificationDoExample = () => (
  <Box pad="small">
    <Notification
      message='Version 1.10.0.3 has been released.'
      onClose={() => {}}
      actions={[
        {
          href: '#',
          label: 'View updates',
        },
      ]}
    />
  </Box>
);
