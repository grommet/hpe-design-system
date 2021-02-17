import React, { useContext, useState } from 'react';
import { Button, Box, Layer, ResponsiveContext, Text } from 'grommet';
import { Alert, MailOption, Close } from 'grommet-icons';

export const LayerCenterExample = () => {
  const [open, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  return (
    <>
      <Box align="start">
        <Button label="Show me the modal" onClick={onOpen} primary />
      </Box>
      {open && (
        <Layer position="center" modal onClickOutside={onClose} onEsc={onClose}>
          <Box
            fill="vertical"
            overflow="auto"
            width={size !== 'small' ? 'medium' : undefined}
            pad="medium"
          >
            <Box justify="between" direction="row">
              <Box flex={false} gap="small" direction="row">
                <Box justify="center">
                <MailOption />
                </Box>
                <Text margin="none" size="xlarge">
                  Modal Dialog
                </Text>
              </Box>
              <Box justify="center">
              <Button icon={<Close size="small" justify=
              "center" />} onClick={onClose} />
              </Box>
            </Box>
            <Box overflow="auto" pad={{ vertical: 'medium' }}>
              <Text>
                For modal dialogs, the use case will determine the design and
                size of the box for your content
              </Text>
            </Box>
          </Box>
          <Box
            fill="vertical"
            overflow="auto"
            width={size !== 'small' ? 'medium' : undefined}
          >
            <Box
              direction="row"
              gap="small"
              pad="medium"
              background="background-contrast"
            >
              <Alert color="status-critical" />
              <Text weight="bold">Footer if you need it</Text>
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
