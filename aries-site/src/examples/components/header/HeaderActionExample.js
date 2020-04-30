import React from 'react';
import { Box, Button, Header, Text } from 'grommet';
import { Add, Hpe } from 'grommet-icons';

export const HeaderActionExample = () => {
  return (
    <Header fill="horizontal">
      <Button>
        <Box direction="row" align="center" gap="medium">
          <Hpe color="brand" />
          <Box direction="row" gap="xsmall">
            <Text weight="bold">HPE</Text>
            <Text>App Name</Text>
          </Box>
        </Box>
      </Button>
      <Button label="Label" icon={<Add />} reverse />
    </Header>
  );
};
