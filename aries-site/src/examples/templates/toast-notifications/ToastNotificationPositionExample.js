import React, { useState } from 'react';
import { Box, Button, Notification, Paragraph } from 'grommet';

export const ToastNotificationPositionExample = () => {
  const [visible, setVisible] = useState();

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(undefined);

  return (
    <>
      <Box align="center" gap="medium">
        <Paragraph textAlign="center">
          This toast notification is aligned to pop up in the top right corner
          of the page.
        </Paragraph>
        <Button label="Show the Toast Notification" onClick={onOpen} primary />
      </Box>
      <Box align="center" gap="small">
        {visible && (
          <Notification
            toast={{ position: 'top-right' }}
            status="normal"
            title="This toast notification is aligned to be top-right."
            onClose={onClose}
          />
        )}
      </Box>
    </>
  );
};
