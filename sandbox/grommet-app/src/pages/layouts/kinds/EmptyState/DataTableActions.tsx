import React from 'react';
import { Box, Menu } from 'grommet';

export const DataTableActions = (
  { servers, ...rest }:
    {
      servers: object[],
      [key: string]: any
    }
) => {
  const serverActions =
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
    ];

  let tableActions = [
    [
      {
        label: 'Add instance',
        onClick: () => { }
      },
    ]
  ]

  if (servers.length > 0) {
    tableActions.push(serverActions);
  }

  return (
    <Box direction="row" {...rest}>
      <Menu label="Actions" items={tableActions} />
    </Box>
  );
}
