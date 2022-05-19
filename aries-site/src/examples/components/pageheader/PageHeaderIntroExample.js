import React from 'react';
import { Anchor, Button, PageHeader } from 'grommet';
import { FormPrevious } from 'grommet-icons';

export const PageHeaderIntroExample = () => (
  <PageHeader
    title="Devices"
    subtitle="View and manage devices."
    parent={<Anchor label="Dashboard" icon={<FormPrevious />} />}
    actions={<Button label="Export Devices" secondary />}
  />
);
