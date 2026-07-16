import React from 'react';
import { Menu } from 'grommet';

export const MenuDividersExample = () => (
  <Menu
    label="Servers"
    alignSelf="start"
    items={[
      [
        { label: 'Edit' },
        { label: 'View servers' },
        { label: 'Add servers' },
        { label: 'Remove servers' },
      ],
      [{ label: 'Update firmware' }, { label: 'Update BIOS settings' }],
      [{ label: 'Delete' }],
    ]}
  />
);
