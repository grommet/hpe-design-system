import React from 'react';

import { StatusGoodSmall } from 'grommet-icons/icons/StatusGoodSmall';
import { FormClose } from 'grommet-icons/icons/FormClose';

import { Box, Button, Layer, Text } from 'grommet';

const Notification = ({ toast, title, message, onClose, preview }) => {
  let content = (
    <Box 
        elevation="medium" 
        round="xsmall" 
        width={preview ? null : "medium" }
        pad={{ horizontal: 'small', vertical: 'xsmall' }} 
        background={{ color: 'background-front' }}
    >
      <Box direction="row">
        <Box id="status-indicator" pad={{ right: 'small' }}>
          <StatusGoodSmall color="status-ok" />
        </Box>
        <Box
          id="content"
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
            <Box>
              <Button
                id="close-button"
                icon={<FormClose color={{ light: 'black', dark: 'white' }} />}
                onClick={onClose}
                plain
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );

  if (toast) {
    content = (
      <Layer
        animation="fadeIn"
        position="top"
        modal={false} 
        onEsc={onClose} 
        plain
        margin={{top: 'medium'}}
      >{content}</Layer>
    );
  }

  return content;
};

Notification.displayName = 'Notification';

const NotificationWrapper =  Notification;

export { NotificationWrapper as Notification };
