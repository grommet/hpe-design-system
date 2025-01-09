import React from 'react';
import { Box, Menu } from 'grommet';

export const DataTableActions = () => {
  const tableActions = [
    [
      {
        label: 'Move location',
        onClick: () => { }
      },
    ],
    [
      {
        label: 'Power on',
        onClick: () => { }
      },
      {
        label: 'Power off',
        onClick: () => { }
      },
      {
        label: 'Reboot',
        onClick: () => { }
      },
    ]
  ]


  return (
    <Box direction="row">
      <Menu label="Actions" items={tableActions} />
    </Box>
  );
}