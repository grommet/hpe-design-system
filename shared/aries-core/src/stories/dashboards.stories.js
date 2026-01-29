/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { DashboardExample } from 'apps/aries-site/src/examples/templates/dashboards/DashboardExample';
import { ThreeColumnDashboard } from 'apps/aries-site/src/examples/templates/dashboards';
import { TwoColumnDashboard } from 'apps/aries-site/src/examples/templates/dashboards/TwoColumnDashboard';

const meta = {
  title: 'Dashboards',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Dashboard = {
  render: () => <DashboardExample />,
};

export const ThreeColumn = {
  render: () => <ThreeColumnDashboard />,
};

export const TwoColumn = {
  render: () => <TwoColumnDashboard />,
};
