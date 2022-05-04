import React, { useContext, useMemo, useState } from 'react';
import { Box, Button, ResponsiveContext, Text } from 'grommet';
import { defaultUser, GlobalHeader, UserContext } from '../global-header';
import { DashboardGrid, DashboardFooter, Greeting } from '.';

export const DashboardExample = () => {
  const [user, setUser] = useState(defaultUser);
  const size = useContext(ResponsiveContext);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );

  return (
    <UserContext.Provider value={contextValue}>
      <Box width={{ max: 'xxlarge' }} margin="auto" fill>
        <GlobalHeader />
        <Box overflow="auto">
          <Box
            background="background"
            justify="center"
            pad={{
              horizontal: !['xsmall', 'small'].includes(size)
                ? 'xlarge'
                : 'medium',
              vertical: 'large',
            }}
            flex={false}
          >
            {user ? (
              <Box gap="large">
                <Greeting />
                <DashboardGrid />
              </Box>
            ) : (
              <DemoPageContent />
            )}
          </Box>
          {user && <DashboardFooter />}
        </Box>
      </Box>
    </UserContext.Provider>
  );
};

// This is for demo purposes only. Replace in production with app
// specific content.
const DemoPageContent = () => {
  const { setUser } = useContext(UserContext);
  return (
    <Box align="center" gap="small">
      <Text>This button is for demo purposes only.</Text>
      <Button label="Sign In" primary onClick={() => setUser(defaultUser)} />
    </Box>
  );
};
