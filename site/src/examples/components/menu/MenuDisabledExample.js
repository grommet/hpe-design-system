import React from 'react';
import { Menu } from 'grommet';

export const MenuDisabledExample = () => {
  const items = [
    { label: 'Reset password' },
    { label: 'Change username' },
    { label: 'Logout' },
  ];

  return (
    <Menu label="Account Information" items={items} width="medium" disabled />
  );
};
