import React from 'react';
import { Menu } from 'grommet';

export const MenuDefaultExample = () => {
  const items = [{ label: 'Action' }, { label: 'Action' }, { label: 'Action' }];

  return <Menu label="Actions" items={items} alignSelf="start" />;
};
