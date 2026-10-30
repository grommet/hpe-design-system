// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, DropButton, Nav, ResponsiveContext, Text } from 'grommet';
import { AIGen, Help, Home } from '@hpe-design/icons-grommet';
import { TextEmphasis } from '@shared/aries-core';
import { UserContext } from '.';
import { UserAvatar } from './UserAvatar';

const getInitials = ({ firstName = '', lastName = '' }) =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`;

export const HeaderNav = ({ assistant }) => {
  const size = useContext(ResponsiveContext);
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState();

  return user ? (
    <Nav align="center" direction="row" gap="xsmall">
      {/* The assistant toggle stays available at every size so the panel
          can be opened and closed from the UI on small screens too. */}
      {assistant && (
        <Button
          id={assistant.id}
          icon={<AIGen />}
          a11yTitle={assistant.label}
          title={assistant.label}
          aria-expanded={assistant.open}
          aria-controls={assistant.open ? assistant.controls : undefined}
          active={assistant.open}
          onClick={assistant.onToggle}
        />
      )}
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

HeaderNav.propTypes = {
  assistant: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    open: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
    controls: PropTypes.string,
  }),
};

const UserDetails = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <Box width="medium">
      <Box pad="medium" direction="row" gap="xsmall">
        <UserAvatar initials={getInitials(user)} size="large" />
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
