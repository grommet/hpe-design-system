import React, { useContext } from 'react';
import { Button, Menu, PageHeader, ResponsiveContext } from 'grommet';
import { More } from 'grommet-icons';
import { ReverseAnchor } from '../../templates';

const actions = [
  {
    label: 'Export Devices',
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
        !['xsmall', 'small'].includes(breakpoint) ? (
          <Button label="Export Devices" secondary />
        ) : (
          <Menu items={actions} icon={<More />} />
        )
      }
    />
  );
};
