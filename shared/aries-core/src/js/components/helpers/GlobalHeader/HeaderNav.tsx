// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useState } from 'react';
import type { ComponentType, PropsWithChildren } from 'react';
import { Box, Button, DropButton, Nav, ResponsiveContext, Text } from 'grommet';
import type { TextProps } from 'grommet';
import { Help, Home } from '@hpe-design/icons-grommet';
import {
  TextEmphasis as UntypedTextEmphasis,
} from '../../typography/TextEmphasis';
import { UserContext } from './UserContext';
import type { User } from './UserContext';
import { UserAvatar } from './UserAvatar';

const TextEmphasis: ComponentType<PropsWithChildren<TextProps>> =
  UntypedTextEmphasis;

const getInitials = ({ firstName = '', lastName = '' }: Partial<User>) =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`;

const UserDetails = () => {
  const { user, setUser } = useContext(UserContext);
  if (!user) return null;

  return (
    <Box width="medium">
      <Box pad="medium" direction="row" gap="xsmall">
        <UserAvatar initials={getInitials(user)} size="large" />
        <Box pad={{ vertical: 'xsmall' }}>
          <TextEmphasis size="large">
            {[user.firstName, user.lastName].filter(Boolean).join(' ')}
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

export const HeaderNav = () => {
  const size = useContext(ResponsiveContext);
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState<boolean | undefined>();

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
        <UserAvatar initials={getInitials(user)} />
      </DropButton>
    </Nav>
  ) : null;
};
