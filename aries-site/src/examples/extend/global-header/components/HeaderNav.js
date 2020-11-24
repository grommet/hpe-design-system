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
import { HelpOption, Home } from 'grommet-icons';
import { UserContext } from '.';

export const HeaderNav = () => {
  const size = useContext(ResponsiveContext);
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState();

  return user ? (
    <Nav align="center" direction="row" gap="small">
      {size !== 'small' && (
        <>
          <Button icon={<HelpOption />} a11yTitle="Help" title="Help" />
          <Button icon={<Home />} a11yTitle="Home" title="Home" />
        </>
      )}
      <DropButton
        dropContent={<AvatarDropContent />}
        dropProps={{ align: { top: 'bottom', right: 'right' } }}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        {!user.image ? (
          <Avatar background="blue!" flex={false}>
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

const AvatarDropContent = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <Box width="medium">
      <Box pad="medium" direction="row" gap="small">
        {user && !user.image ? (
          <Avatar background="blue!" flex={false} size="large">
            <Text size="xlarge" color="text-strong">
              JD
            </Text>
          </Avatar>
        ) : (
          <Avatar src={user.image} size="large" />
        )}
        <Box pad={{ vertical: 'small' }}>
          <Text color="text-strong" size="large" weight="bold">
            {`${user.firstName} ${user.lastName}`}
          </Text>
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
        pad={{ horizontal: 'xsmall', vertical: 'small' }}
      >
        <Button label="My Profile" />
        <Button label="Sign Out" onClick={() => setUser()} />
      </Box>
    </Box>
  );
};
