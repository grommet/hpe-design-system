import React from 'react';

import { Notification } from '../components';
import { Box } from 'grommet';

export const ToastPreview = () => (
    <Box align="center" justify="center" fill background="background-back">
      <Notification preview title="Hooray!" message="Your toast is done" onClose />
    </Box>
  );
