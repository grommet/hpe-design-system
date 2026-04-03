/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
import { DashboardExample } from 'apps/docs/src/examples/templates/dashboards/DashboardExample';
import { ThreeColumnDashboard } from 'apps/docs/src/examples/templates/dashboards';
import { TwoColumnDashboard } from 'apps/docs/src/examples/templates/dashboards/TwoColumnDashboard';
import DashboardExampleSource from 'apps/docs/src/examples/templates/dashboards/DashboardExample.js?raw';
import ThreeColumnDashboardSource from 'apps/docs/src/examples/templates/dashboards/ThreeColumnDashboard.js?raw';
import TwoColumnDashboardSource from 'apps/docs/src/examples/templates/dashboards/TwoColumnDashboard.js?raw';

const meta = {
  title: 'Patterns/Dashboards',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export default meta;

export const Dashboard = {
  render: () => <DashboardExample />,
  parameters: {
    docs: {
      source: {
        code: DashboardExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const ThreeColumn = {
  render: () => <ThreeColumnDashboard />,
  parameters: {
    docs: {
      source: {
        code: ThreeColumnDashboardSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const TwoColumn = {
  render: () => <TwoColumnDashboard />,
  parameters: {
    docs: {
      source: {
        code: TwoColumnDashboardSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
