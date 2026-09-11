// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Menu } from 'grommet';

export const MenuKindExample = () => {
  const items = [
    { label: 'Edit' },
    { label: 'View servers' },
    { label: 'Add servers' },
  ];

  return (
    <Box direction="row" gap="small">
      <Menu kind="primary" label="Actions" items={items} />
      <Menu kind="secondary" label="Actions" items={items} />
    </Box>
  );
};
