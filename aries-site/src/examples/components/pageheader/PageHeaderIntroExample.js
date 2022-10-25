import React, { useContext } from 'react';
import { Button, PageHeader, ResponsiveContext } from 'grommet';
import { ActionMenu, ReverseAnchor } from '../../templates';

const actions = [
  {
    label: 'Export devices',
    secondary: true,
  },
];

export const PageHeaderIntroExample = () => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <PageHeader
      title="Devices"
      subtitle="View and manage devices."
      parent={<ReverseAnchor label="Dashboard" />}
      actions={
        breakpoint !== 'xsmall' ? (
          <Button label="Export devices" secondary />
        ) : (
          <ActionMenu items={actions} />
        )
      }
    />
  );
};
