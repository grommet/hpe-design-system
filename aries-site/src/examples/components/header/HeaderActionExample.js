import React from 'react';
import { Box, Button, Header, Text } from 'grommet';
import { Add, Hpe } from 'grommet-icons';

export function HeaderActionExample() {
  return <Header fill="horizontal">
      <Button>
        <Box
          direction="row"
          align="start"
          gap="medium"
          // pad maintains accessible hit target
          // non-responsive maintains same dimensions for mobile
          pad={{ vertical: 'small' }}
          responsive={false}
        >
          <Hpe color="brand" />
          <Box direction="row" gap="xsmall" wrap>
            <Text color="text-strong" weight="bold">
              HPE
            </Text>
            <Text color="text-strong">App Name</Text>
          </Box>
        </Box>
      </Button>
      <Button label="Label" icon={<Add />} reverse />
    </Header>;
}
