import React, { useContext } from 'react';
import { Box, Heading, Header, Text } from 'grommet';
import { UserContext } from '../../global-header';

export const PageHeader = () => {
  const { user } = useContext(UserContext);
  return (
    <Header>
      <Box gap="xsmall">
        <Heading color="text-strong" margin="none">
          Hello, {user.firstName}!
        </Heading>
        <Text size="large">Welcome to the HPE Common Cloud Console</Text>
      </Box>
    </Header>
  );
};
