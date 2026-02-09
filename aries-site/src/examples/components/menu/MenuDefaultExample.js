import React from 'react';
import { Menu } from 'grommet';

export const MenuDefaultExample = () => {
  const items = [
    { label: 'Edit' },
    { label: 'View servers' },
    { label: 'Add servers' },
  ];

  return <Menu label="Servers" items={items} alignSelf="start" />;
};
