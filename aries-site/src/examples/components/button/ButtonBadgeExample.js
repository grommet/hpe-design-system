import React from 'react';
import { Box, Button } from 'grommet';
import { Notification } from '@hpe-design/icons-grommet';

export const ButtonBadgeExample = () => (
  <Box direction="row" gap="medium">
    <Button aria-label="Notifications" icon={<Notification />} badge />
    <Button label="Devices" badge={3} />
    <Button label="Reports" badge={15} />
    <Button label="Unread" badge={{ value: 100, max: 99 }} />
  </Box>
);
