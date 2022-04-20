import React, { useContext, useState } from 'react';
import {
  Button,
  Box,
  Header,
  Heading,
  Layer,
  ResponsiveContext,
} from 'grommet';
import { MonitorFormExample } from './MonitorFormExample';

export const LayerStickyExample = () => {
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
            width={!['xsmall', 'small'].includes(size) ? 'medium' : undefined}
          >
            <Header pad={{ vertical: 'medium', horizontal: 'medium' }}>
              <Heading margin="none" level={2} size="small">
                Add Monitor
              </Heading>
            </Header>
            <MonitorFormExample sticky />
          </Box>
        </Layer>
      )}
    </>
  );
};
