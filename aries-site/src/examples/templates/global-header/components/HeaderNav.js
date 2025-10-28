import React, { useContext, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  DropButton,
  Nav,
  ResponsiveContext,
  Text,
} from 'grommet';
import { Help, Home } from '@hpe-design/icons-grommet';
import { TextEmphasis } from 'aries-core';
import { UserContext } from '.';

export const HeaderNav = () => {
  const size = useContext(ResponsiveContext);
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState();

  return user ? (
    <Nav align="center" direction="row" gap="xsmall">
      {!['xsmall', 'small'].includes(size) && (
        <>
          <Button icon={<Help />} a11yTitle="Help" title="Help" />
          <Button icon={<Home />} a11yTitle="Home" title="Home" />
        </>
      )}
      <DropButton
        dropContent={<UserDetails />}
        dropProps={{ align: { top: 'bottom', right: 'right' } }}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        {!user.image ? (
          <Avatar background="decorative-purple" flex={false}>
            <Text size="large" color="text-strong">
              JD
            </Text>
          </Avatar>
        ) : (
          <Avatar src={user.image} />
        )}
      </DropButton>
    </Nav>
  ) : null;
};

const UserDetails = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <Box width="medium">
      <Box pad="medium" direction="row" gap="xsmall">
        {user && !user.image ? (
          <Avatar background="decorative-purple" flex={false} size="large">
            <Text size="xlarge" color="text-strong">
              JD
            </Text>
          </Avatar>
        ) : (
          <Avatar src={user.image} size="large" />
        )}
        <Box pad={{ vertical: 'xsmall' }}>
          <TextEmphasis size="large">
            {`${user.firstName} ${user.lastName}`}
          </TextEmphasis>
          <Text size="small">{user.email}</Text>
        </Box>
      </Box>
      <Box
        border={{
          side: 'top',
          color: 'border-weak',
        }}
        direction="row"
        align="center"
        justify="between"
        pad={{ horizontal: '3xsmall', vertical: 'xsmall' }}
      >
        <Button label="My Profile" />
        <Button label="Sign Out" onClick={() => setUser()} />
      </Box>
    </Box>
  );
};
