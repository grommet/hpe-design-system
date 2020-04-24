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
    <Header background="background-contrast" pad="small" fill="horizontal">
      <Button>
        <Box direction="row" align="center" gap="medium">
          <Hpe color="brand" />
          {size !== 'small' && (
            <Box direction="row" gap="xsmall">
              <Text weight="bold">HPE</Text>
              <Text>App Name</Text>
            </Box>
          )}
        </Box>
      </Button>
      <Menu label="Account Information" items={items} width="medium" />
    </Header>
  );
};
