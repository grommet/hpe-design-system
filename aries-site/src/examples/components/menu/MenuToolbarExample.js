import React from 'react';
import { Menu } from 'grommet';

export const MenuToolbarExample = () => {
  const items = [{ label: 'Action' }, { label: 'Action' }, { label: 'Action' }];

  return (
    <Menu kind="toolbar" label="Actions" items={items} alignSelf="start" />
  );
};
