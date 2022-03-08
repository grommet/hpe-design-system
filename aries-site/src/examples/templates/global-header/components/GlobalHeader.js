import React, { useContext } from 'react';
import { Header, ResponsiveContext } from 'grommet';
import { AppIdentity, HeaderNav, UserContext } from '.';

export const GlobalHeader = () => {
  const size = useContext(ResponsiveContext);
  const { user } = useContext(UserContext);
  return (
    <>
      <Header
        align="center"
        background="background"
        border={user ? { color: 'border-weak', side: 'bottom' } : undefined}
        justify="between"
        fill="horizontal"
        pad={{
          horizontal: !['xsmall', 'small'].includes(size) ? 'medium' : 'small',
          vertical: 'small',
        }}
      >
        <AppIdentity title="Service Name" brand="hpe" />
        {user && <HeaderNav />}
      </Header>
    </>
  );
};
