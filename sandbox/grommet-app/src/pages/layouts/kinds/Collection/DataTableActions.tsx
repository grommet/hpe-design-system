import React from 'react';
import { Box, Menu } from 'grommet';
import { MoreVertical } from 'grommet-icons';

export const DataTableActions = ({ responsive, ...rest }) => {
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

  const label = "Actions";


  return (
    <Box direction="row" {...rest}>
      <Menu
        label={responsive ? undefined : label}
        items={tableActions}
        kind='toolbar'
        icon={responsive ? <MoreVertical /> : undefined}
      />
    </Box>
  );
}
