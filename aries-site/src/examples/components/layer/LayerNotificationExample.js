import React, { useState } from 'react';
import { Button, Box, Layer, Text } from 'grommet';
import { StatusGood, FormClose } from 'grommet-icons';

export const LayerNotificationExample = () => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <>
      <Box align="start">
        <Button label="Show me the notification" onClick={onOpen} primary />
      </Box>
      {open && (
        <Layer
          position="top"
          modal={false}
          margin={{ vertical: 'medium', horizontal: 'small' }}
          responsive={false}
          plain
        >
          <Box
            align="center"
            direction="row"
            gap="xsmall"
            justify="between"
            round="medium"
            elevation="medium"
            pad={{ vertical: 'xxsmall', horizontal: 'small' }}
            background="status-ok"
          >
            <Box align="center" direction="row" gap="small">
              <StatusGood color="text-strong" />
              <Text color={{ light: 'text', dark: 'text-strong' }}>
                This is a notifcation with position="top"
              </Text>
            </Box>
            <Button icon={<FormClose />} onClick={onClose} plain />
          </Box>
        </Layer>
      )}
    </>
  );
};
