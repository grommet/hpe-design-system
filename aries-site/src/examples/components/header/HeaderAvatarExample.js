import React from 'react';
import { Avatar, Box, Button, Header, Text } from 'grommet';
import { Element } from '@hpe-design/icons-grommet';

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
        <Element color="brand" />
        <Box direction="row" gap="3xsmall" wrap>
          <Text color="text-strong" weight="bold">
            HPE
          </Text>
          <Text color="text-strong">App Name</Text>
        </Box>
      </Box>
    </Button>
    <Button>
      {/* TODO: Consider a different background here. Temporary 
      solution until there is a wider range of colors in the 
      theme. */}
      <Avatar background="decorative-green">
        <Text color="text-strong">ES</Text>
      </Avatar>
    </Button>
  </Header>
);
