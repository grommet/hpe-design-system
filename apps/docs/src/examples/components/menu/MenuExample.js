// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Menu } from 'grommet';

export const MenuExample = ({ ...rest }) => {
  const items = [
    { label: 'Change username' },
    { label: 'Reset Password' },
    { label: 'Logout' },
  ];

  return <Menu label="Manage account" items={items} width="medium" {...rest} />;
};
