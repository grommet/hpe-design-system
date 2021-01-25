import React, { useContext, useState } from 'react';
import { Box, Button, Text } from 'grommet';
import { defaultUser, GlobalHeader, UserContext } from '.';

export const GlobalHeaderExample = () => {
  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Box
        background="background"
        width={{ max: 'xxlarge' }}
        margin="auto"
        fill
      >
        <GlobalHeader />
        <DemoPageContent />
      </Box>
    </UserContext.Provider>
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
