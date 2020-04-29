import React from 'react';
import { Avatar, Box, Button, Header, Text } from 'grommet';
import { Hpe } from 'grommet-icons';

export const HeaderAvatarExample = () => {
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
      <Avatar background="background-contrast">ES</Avatar>
    </Header>
  );
};
