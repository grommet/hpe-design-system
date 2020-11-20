import React, { useContext } from 'react';
import { Button, Box, Text } from 'grommet';
import { Hpe } from 'grommet-icons';
import { UserContext } from '.';

export const AppIdentity = () => {
  const { user } = useContext(UserContext);
  return (
    <Button>
      <Box
        direction="row"
        align="start"
        gap="small"
        // pad maintains accessible hit target
        // non-responsive maintains same dimensions for mobile
        pad={{ vertical: 'small' }}
        responsive={false}
      >
        <Hpe color="brand" />
        <Box direction="row" gap="xsmall" wrap>
          {user ? (
            <Text color="text-strong" weight="bold">
              HPE Console
            </Text>
          ) : (
            <Text color="text-strong">Hewlett Packard Enterprise</Text>
          )}
        </Box>
      </Box>
    </Button>
  );
};
