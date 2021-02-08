import React, { useEffect, useState } from 'react';
import { Box, CheckBox, Button, Text } from 'grommet';
import { HeaderNav, defaultUser, UserContext } from '.';

export const HeaderNavItems = () => {
  const [user, setUser] = useState(defaultUser);
  const [showProfilePicture, setShowProfilePicture] = useState(true);

  useEffect(() => {
    if (user && user.image) setShowProfilePicture(true);
  }, [user]);

  const onToggle = () => {
    if (user) {
      if (showProfilePicture) setUser({ ...user, image: '' });
      else setUser(defaultUser);
    }
    setShowProfilePicture(!showProfilePicture);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Box align="start" gap="medium">
        <HeaderNav />
        {!user && (
          <Box gap="small">
            <Text>This button is for demo purposes only.</Text>
            <Button
              label="Sign In"
              primary
              onClick={() => setUser(defaultUser)}
            />
          </Box>
        )}
        <CheckBox
          label="Profile Picture"
          toggle
          checked={showProfilePicture}
          onClick={onToggle}
        />
      </Box>
    </UserContext.Provider>
  );
};
