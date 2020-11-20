import React, { useState } from 'react';
import { Box, CheckBox, Button, Text } from 'grommet';
import { HeaderNav, UserContext } from '.';

const defaultUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@hpe.com',
  image: '//s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80',
};

export const HeaderNavItems = () => {
  const [user, setUser] = useState(defaultUser);
  const [checked, setChecked] = useState(true);

  const onToggle = () => {
    if (checked) setUser({ ...user, image: '' });
    else setUser(defaultUser);
    setChecked(!checked);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Box gap="medium">
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
          checked={checked}
          onClick={onToggle}
        />
      </Box>
    </UserContext.Provider>
  );
};
