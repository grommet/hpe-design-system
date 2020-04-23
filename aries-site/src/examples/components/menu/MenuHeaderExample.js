import React from 'react';
import { Header, Menu } from 'grommet';
import { AppIdentity } from 'aries-core';

export const MenuHeaderExample = () => {
  const items = [
    { label: 'Change username' },
    { label: 'Reset Password' },
    { label: 'Logout' },
  ];

  return (
    <Header background="background-contrast" pad="small" fill>
      <AppIdentity brand="hpe" title="Service Name" />
      <Menu label="Account Information" items={items} width="medium" />
    </Header>
  );
};
