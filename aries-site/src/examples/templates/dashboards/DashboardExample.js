import React, { useContext, useMemo, useState } from 'react';
import { Box, Button, Text, Page, PageContent } from 'grommet';
import { defaultUser, GlobalHeader, UserContext } from '../global-header';
import { DashboardGrid, DashboardFooter, Greeting } from '.';

export const DashboardExample = () => {
  const [user, setUser] = useState(defaultUser);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );

  return (
    <UserContext.Provider value={contextValue}>
      <GlobalHeader />
      <Page background="background-back">
        <Box overflow="auto">
          <PageContent>
            <Box flex={false}>
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
          </PageContent>
        </Box>
      </Page>
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
