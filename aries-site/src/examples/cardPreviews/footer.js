import React from 'react';
import { Box, Footer, Text } from 'grommet';

export function FooterPreview() {
  return <Footer
      background="background-front"
      border={{ color: 'background-contrast', side: 'top' }}
      fill="horizontal"
    >
      <Box direction="row" gap="xsmall">
        <Text size="small">&copy; 2020 HPE</Text>
      </Box>
      <Box direction="row" gap="xsmall">
        <Text size="small">Terms</Text>
        <Text size="small">Privacy</Text>
        <Text size="small">Security</Text>
      </Box>
    </Footer>;
}
