import React from 'react';
import { Box, Header, Button, Text } from 'grommet';
import { Menu } from '@hpe-design/icons-grommet';
import { Hpe } from 'grommet-icons';

export const HeaderPreview = () => (
  <Header
    border={{ color: 'background-contrast', side: 'bottom' }}
    pad={{ horizontal: '3xsmall' }}
    background="background-front"
    fill="horizontal"
  >
    <Box direction="row" gap="xsmall">
      <Hpe color="brand" height="medium" />
      <Box align="center" gap="3xsmall" direction="row">
        <Text color="text-strong" weight="bold">
          HPE
        </Text>
        <Text color="text-strong">Text</Text>
      </Box>
    </Box>
    <Button a11yTitle="Menu" icon={<Menu />} tabIndex={-1} />
  </Header>
);
