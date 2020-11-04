import React from 'react';
import { Box, Header, Button, Text } from 'grommet';
import { Hpe, Menu } from 'grommet-icons';

export const HeaderPreview = () => {
  return (
    <Header
      border={{ color: 'background-contrast', side: 'bottom' }}
      background="background-front"
      fill="horizontal"
    >
      <Box direction="row">
        <Button icon={<Hpe color="brand" />} tabIndex={-1} />
        <Box gap="xsmall" direction="row">
          <Text color="text-strong" weight="bold" alignSelf="center">
            HPE
          </Text>
          <Text color="text-strong" alignSelf="center">
            Text
          </Text>
        </Box>
      </Box>
      <Button icon={<Menu />} tabIndex={-1} />
    </Header>
  );
};
