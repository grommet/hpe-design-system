import React from 'react';
import { Menu } from 'grommet';

export const MenuExample = ({ ...rest }) => {
  const items = [
    { label: 'Change username' },
    { label: 'Reset Password' },
    { label: 'Logout' },
  ];

  return <Menu label="Manage Account" items={items} width="medium" {...rest} />;
};
