import React, { useContext } from 'react';
import { Box, Button, Header, Menu, Text, ResponsiveContext } from 'grommet';
import { Hpe } from 'grommet-icons';

export const MenuHeaderExample = () => {
  const items = [
    { label: 'Change username' },
    { label: 'Reset Password' },
    { label: 'Logout' },
  ];

  const size = useContext(ResponsiveContext);

  return (
    <Header pad="small" fill="horizontal">
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
          <Hpe color="brand" height="medium" />
          {!['xsmall', 'small'].includes(size) && (
            <Box direction="row" gap="xsmall" wrap>
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
