import React from 'react';

import { StatusGoodSmall } from 'grommet-icons/icons/StatusGoodSmall';
import { FormClose } from 'grommet-icons/icons/FormClose';

import { Box, Button, Layer, Text } from 'grommet';

const Notification = ({ toast, title, message, onClose }) => {
  let content = (
    <Box direction="row">
      <Box pad={{ right: 'small' }}>
        <StatusGoodSmall color="status-ok" />
      </Box>
      <Box
        gap="medium"
        align="start"
        direction="row"
        justify="between"
        fill
      >
        <Box>
            <Text 
                weight="bold" 
                color={{ light: 'black', dark: 'white' }}
            >{title}</Text>
          {message && (
            <Text 
                color={{ light: 'black', dark: 'white' }}
            >{message}</Text>
          )}
        </Box>
        {onClose && (
          <Button
            icon={<FormClose color={{ light: 'black', dark: 'white' }} />}
            onClick={onClose}
            plain
          />
        )}
      </Box>
    </Box>
  );

  if (toast) {
    content = (
      <Layer
        modal={false} 
        onEsc={onClose} 
        plain
      >
        <Box 
            elevation="medium" 
            round="xsmall" 
            width="medium" 
            pad={{ horizontal: 'medium', vertical: 'xsmall' }} 
            background={{ color: 'background-front' }}
        >{content}</Box>
      </Layer>
    );
  }

  return content;
};

Notification.displayName = 'Notification';

const NotificationWrapper =  Notification;

export { NotificationWrapper as Notification };
