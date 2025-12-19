import React, { useContext } from 'react';
import { Box, Button, Header, Menu, Text, ResponsiveContext } from 'grommet';
import { Element } from '@hpe-design/icons-grommet';

export const MenuHeaderExample = () => {
  const items = [
    { label: 'Change username' },
    { label: 'Reset Password' },
    { label: 'Logout' },
  ];

  const size = useContext(ResponsiveContext);

  return (
    <Header pad="xsmall" fill="horizontal">
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
          <Element color="brand" height="medium" />
          {!['xsmall', 'small'].includes(size) && (
            <Box direction="row" gap="3xsmall" wrap>
              <Text color="text-strong" weight="bold">
                HPE
              </Text>
              <Text color="text-strong">App Name</Text>
            </Box>
          )}
        </Box>
      </Button>
      <Menu label="Account information" items={items} width="medium" />
    </Header>
  );
};
