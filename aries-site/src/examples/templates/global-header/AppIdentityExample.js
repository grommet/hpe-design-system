import React, { useState } from 'react';
import { Box, CheckBox } from 'grommet';
import { AppIdentity, defaultUser, UserContext } from '.';

export const AppIdentityExample = () => {
  const [user, setUser] = useState(defaultUser);
  const [signedIn, setSignedIn] = useState(true);
  const [isAruba, setIsAruba] = useState();

  const onToggle = () => {
    if (user) setUser();
    else setUser(defaultUser);

    setSignedIn(!signedIn);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Box gap="small" align="start">
        <AppIdentity title="Service Name" brand={!isAruba ? 'hpe' : 'aruba'} />
        <CheckBox
          label="Signed In"
          checked={signedIn}
          onClick={onToggle}
          toggle
        />
        {signedIn && (
          <CheckBox
            label="Aruba Service"
            checked={isAruba}
            onClick={() => setIsAruba(!isAruba)}
            toggle
          />
        )}
      </Box>
    </UserContext.Provider>
  );
};
