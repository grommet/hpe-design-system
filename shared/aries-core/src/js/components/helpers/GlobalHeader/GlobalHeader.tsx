// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import { Header, ResponsiveContext } from 'grommet';
import { GlobalHeaderIdentity } from './GlobalHeaderIdentity';
import { HeaderNav } from './HeaderNav';
import { UserContext } from './UserContext';

export const GlobalHeader = () => {
  const size = useContext(ResponsiveContext);
  const { user } = useContext(UserContext);
  return (
    <Header
      align="center"
      background="background"
      border={user ? { color: 'border-weak', side: 'bottom' } : undefined}
      justify="between"
      fill="horizontal"
      pad={{
        horizontal: !['xsmall', 'small'].includes(size) ? 'medium' : 'xsmall',
        vertical: 'xsmall',
      }}
    >
      <GlobalHeaderIdentity title="Service Name" brand="hpe" />
      {user && <HeaderNav />}
    </Header>
  );
};
