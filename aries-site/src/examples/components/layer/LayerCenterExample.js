import React, { useContext, useState } from 'react';
import { Button, Box, Heading, Layer, ResponsiveContext, Text } from 'grommet';
import { Alert, MailOption } from 'grommet-icons';

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
          >
            <Box
              flex="grow"
              direction="row"
              gap="medium"
              pad="medium"
              height="small"
            >
              <Box pad={{ top: 'xsmall' }}>
                <MailOption />
              </Box>
              <Box gap="medium">
                <Heading margin="none" size="small">
                  Modal Dialog
                </Heading>
                <Text>
                  For modal dialogs, the use case will determine the design and
                  size of the box for your content
                </Text>
              </Box>
            </Box>
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
