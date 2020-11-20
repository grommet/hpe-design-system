import React, { useContext, useState } from 'react';
import { Box, Button, Header, ResponsiveContext, Text } from 'grommet';
import { AppIdentity, HeaderNav, UserContext } from '.';

const defaultUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@hpe.com',
  image: '//s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80',
};

export const GlobalHeaderExample = () => {
  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Box width={{ max: 'xxlarge' }} margin="auto" fill>
        <GlobalHeader />
        <DemoPageContent />
      </Box>
    </UserContext.Provider>
  );
};

const GlobalHeader = () => {
  const size = useContext(ResponsiveContext);
  const { user } = useContext(UserContext);
  return (
    <>
      <Header
        align="center"
        background="background"
        justify="between"
        fill="horizontal"
        pad={{
          horizontal: size !== 'small' ? 'medium' : 'small',
          vertical: 'small',
        }}
      >
        <AppIdentity title="Service Name" brand="hpe" />
        {user && <HeaderNav />}
      </Header>
    </>
  );
};

// This is for demo purposes only. Replace in production with app
// specific content.
const DemoPageContent = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <Box
      align="center"
      justify="center"
      border={{ color: 'border', style: 'dashed' }}
      flex
    >
      {user ? (
        'Page content goes here.'
      ) : (
        <Box gap="small">
          <Text>This button is for demo purposes only.</Text>
          <Button
            label="Sign In"
            primary
            onClick={() => setUser(defaultUser)}
          />
        </Box>
      )}
    </Box>
  );
};
