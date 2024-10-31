import React from 'react';
/* eslint-disable max-len */
import { DashboardExample } from 'aries-site/src/examples/templates/dashboards/DashboardExample';
import { ThreeColumnDashboard } from 'aries-site/src/examples/templates/dashboards';
import { TwoColumnDashboard } from 'aries-site/src/examples/templates/dashboards/TwoColumnDashboard';

export const Dashboard = () => <DashboardExample />;
export const ThreeColumn = () => <ThreeColumnDashboard />;
export const TwoColumn = () => <TwoColumnDashboard />;

export default {
  title: 'Dashboards',
};
