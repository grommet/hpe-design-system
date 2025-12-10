import React from 'react';
/* eslint-disable max-len */
import { DashboardExample } from 'aries-site/src/examples/templates/dashboards/DashboardExample';
import { ThreeColumnDashboard } from 'aries-site/src/examples/templates/dashboards';
import { TwoColumnDashboard } from 'aries-site/src/examples/templates/dashboards/TwoColumnDashboard';

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
