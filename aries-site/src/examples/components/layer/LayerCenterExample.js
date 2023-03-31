import React, { useContext, useState } from 'react';
import {
  Button,
  Box,
  Layer,
  Heading,
  ResponsiveContext,
  Text,
  Paragraph,
} from 'grommet';
import { Alert } from 'grommet-icons/icons/Alert';
import { Close } from 'grommet-icons/icons/Close';
import { MailOption } from 'grommet-icons/icons/MailOption';

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
            width={!['xsmall', 'small'].includes(size) ? 'medium' : undefined}
            pad="medium"
          >
            <Box justify="between" direction="row">
              <Box flex={false} gap="small" direction="row">
                <Box justify="center">
                  <MailOption />
                </Box>
                <Heading level={2} margin="none">
                  Modal dialog
                </Heading>
              </Box>
              <Box justify="center">
                <Button icon={<Close />} onClick={onClose} />
              </Box>
            </Box>
            <Text>A subtitle if needed</Text>
            <Box overflow="auto" pad={{ vertical: 'medium' }}>
              <Paragraph margin="none">
                The width of this modal dialog is 'medium' (384px) with 'small'
                (12px) corner radius. The Box component has 'medium' (24px)
                padding. For modal dialogs, the use case will determine the
                design and size of the box for your content.
              </Paragraph>
            </Box>
          </Box>
          <Box
            fill="vertical"
            overflow="auto"
            width={!['xsmall', 'small'].includes(size) ? 'medium' : undefined}
          >
            <Box
              direction="row"
              gap="small"
              pad={{ vertical: 'small', horizontal: 'medium' }}
              background="background-contrast"
            >
              <Alert color="status-critical" />
              <Text color="text-strong" weight="bold">
                Footer if you need it
              </Text>
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
