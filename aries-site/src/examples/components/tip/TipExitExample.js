import React from 'react';
import { Box, Button, Paragraph } from 'grommet';
import { Close } from '@hpe-design/icons-grommet';
import { TextEmphasis } from '@shared/aries-core';

export const TipExitExample = () => (
  <Box gap="xsmall" direction="row" align="start">
    <Box width="xsmall">
      <TextEmphasis size="large">Add service</TextEmphasis>
      <Paragraph margin="none">
        Visit the HPE catalog to start adding all of your favorite services.
      </Paragraph>
    </Box>
    <Button a11yTitle="close" icon={<Close />} tip="Close" />
  </Box>
);
