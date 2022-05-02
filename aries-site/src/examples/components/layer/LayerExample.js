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

export function LayerExample() {
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
          full={!['xsmall', 'small'].includes(size) ? 'vertical' : true}
          modal
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box
            fill="vertical"
            overflow="auto"
            width={!['xsmall', 'small'].includes(size) ? 'medium' : undefined}
            pad="medium"
          >
            <Header>
              <Heading level={2} margin="none">
                This is a Layer.
              </Heading>
              <Button
                a11yTitle={`You are on a Close button in a layer containing
                a text description. To close the layer 
                and return to the primary content, press Enter.`}
                autoFocus
                icon={<FormClose />}
                onClick={onClose}
              />
            </Header>
            <Box overflow="auto" pad={{ vertical: 'medium' }}>
              <Text>
                This layer is set to appear on the right and fill the screen
                vertically. You can add content in here such as a Form or a
                Chart.
              </Text>
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
}
