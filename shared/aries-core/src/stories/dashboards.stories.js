/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { DashboardExample } from 'apps/docs/src/examples/templates/dashboards/DashboardExample';
import { ThreeColumnDashboard } from 'apps/docs/src/examples/templates/dashboards';
import { TwoColumnDashboard } from 'apps/docs/src/examples/templates/dashboards/TwoColumnDashboard';

const meta = {
  title: 'Patterns/Dashboards',
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
