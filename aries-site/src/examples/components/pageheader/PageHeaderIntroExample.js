import React, { useContext } from 'react';
import { Anchor, Button, Menu, PageHeader, ResponsiveContext } from 'grommet';
import { FormPrevious, More } from 'grommet-icons';

const actions = [
  {
    label: 'Export Devices',
    secondary: true,
  },
];

export const PageHeaderIntroExample = () => {
  const breakpoint = useContext(ResponsiveContext);
  console.log(breakpoint);
  return (
    <PageHeader
      title="Devices"
      subtitle="View and manage devices."
      parent={<Anchor label="Dashboard" icon={<FormPrevious />} />}
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
