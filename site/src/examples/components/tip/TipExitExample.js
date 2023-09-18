import React from 'react';
import { Box, Button, Paragraph } from 'grommet';
import { Close } from 'grommet-icons';
import { TextEmphasis } from 'library';

export const TipExitExample = () => (
  <Box gap="small" direction="row" align="start">
    <Box width="small">
      <TextEmphasis size="large">Add service</TextEmphasis>
      <Paragraph margin="none">
        Visit the HPE catalog to start adding all of your favorite services.
      </Paragraph>
    </Box>
    <Button a11yTitle="close" icon={<Close />} tip="Close" />
  </Box>
);
