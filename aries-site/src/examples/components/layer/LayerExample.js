import React, { useContext, useState } from 'react';
import {
  Button,
  Box,
  Header,
  Heading,
  Layer,
  ResponsiveContext,
  Text,
} from 'grommet';
import { FormClose } from 'grommet-icons';

export const LayerExample = () => {
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
        <Layer
          position="right"
          full={size !== 'small' ? 'vertical' : true}
          modal
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box
            fill="vertical"
            overflow="auto"
            width={size !== 'small' ? 'medium' : undefined}
            pad="medium"
          >
            <Header>
              <Heading level={2} margin="none">
                This is a Layer.
              </Heading>
              <Button icon={<FormClose />} onClick={onClose} />
            </Header>
            <Box overflow="auto" pad={{ vertical: 'medium' }}>
              <Text>
                This layer is set to appear on the right and fill the screen
                vertically. You can add content in here such as a Form or a
                Chart.
              </Text>
            </Box>
            <Box flex={false} align="start">
              <Button label="Close Layer" primary onClick={onClose} />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
