import React from 'react';
import { Menu } from 'grommet';

export const MenuExample = () => {
  const items = [
    { label: 'Change username' },
    { label: 'Reset Password' },
    { label: 'Logout' },
  ];

  return <Menu label="Manage Account" items={items} width="medium" />;
};
