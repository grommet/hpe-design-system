import React from 'react';
import { Avatar, Box, Button, Header, Text } from 'grommet';
import { Hpe } from 'grommet-icons';

export const HeaderAvatarExample = () => (
    <Header fill="horizontal">
      <Button>
        <Box
          direction="row"
          align="start"
          gap="medium"
          // pad maintains accessible hit target
          // non-responsive maintains same dimensions for mobile
          pad={{ vertical: 'xsmall' }}
          responsive={false}
        >
          <Hpe color="brand" />
          <Box direction="row" gap="3xsmall" wrap>
            <Text color="text-strong" weight="bold">
              HPE
            </Text>
            <Text color="text-strong">App Name</Text>
          </Box>
        </Box>
      </Button>
      <Button>
        <Avatar background="background-contrast">ES</Avatar>
      </Button>
    </Header>
  );
