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
        <Button label="Show me the Layer" onClick={onOpen} primary />
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
              align="center"
              direction="row"
              gap="medium"
              pad="medium"
            >
              <MailOption />
              <Box>
                <Heading margin="none" size="small">
                  You've got mail
                </Heading>
                <Text>How exciting!</Text>
              </Box>
            </Box>
            <Box
              direction="row"
              gap="medium"
              pad="medium"
              background="background-contrast"
            >
              <Alert color="status-critical" />
              <Text weight="bold">Take a lookie loo</Text>
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
