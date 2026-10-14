// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
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
import { TextEmphasis } from '@shared/aries-core';
import { UserContext } from '.';

const getInitials = ({ firstName = '', lastName = '' }) =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`;

const UserAvatar = ({ size = 'medium', user }) => {
  const initials = getInitials(user);
  return (
    <Avatar background="background-accent-purple-weak" flex={false} size={size}>
      <Text size={size === 'large' ? 'xlarge' : 'large'} color="text-strong">
        {initials}
      </Text>
    </Avatar>
  );
};

UserAvatar.propTypes = {
  size: PropTypes.oneOf(['medium', 'large']),
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
};

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
        <UserAvatar user={user} />
      </DropButton>
    </Nav>
  ) : null;
};

const UserDetails = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <Box width="medium">
      <Box pad="medium" direction="row" gap="xsmall">
        <UserAvatar user={user} size="large" />
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
