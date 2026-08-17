// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Menu } from 'grommet';

export const MenuToolbarExample = () => {
  const items = [
    { label: 'Power on' },
    { label: 'Power off' },
    { label: 'Reset' },
  ];

  return (
    <Menu kind="toolbar" label="Actions" items={items} alignSelf="start" />
  );
};
