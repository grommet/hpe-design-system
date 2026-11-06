// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { DashboardExample } from 'apps/docs/src/examples/templates/dashboards/DashboardExample';
import { ThreeColumnDashboard } from 'apps/docs/src/examples/templates/dashboards';
import { TwoColumnDashboard } from 'apps/docs/src/examples/templates/dashboards/TwoColumnDashboard';
import DashboardExampleSource from 'apps/docs/src/examples/templates/dashboards/DashboardExample.js?raw';
import ThreeColumnDashboardSource from 'apps/docs/src/examples/templates/dashboards/ThreeColumnDashboard.js?raw';
import TwoColumnDashboardSource from 'apps/docs/src/examples/templates/dashboards/TwoColumnDashboard.js?raw';
import { OverviewDashboard } from '../js/examples/dashboards/overview/OverviewDashboard';
import OverviewDashboardSource from '../js/examples/dashboards/overview/OverviewDashboard.tsx?raw';

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

export const Overview = {
  render: () => <OverviewDashboard />,
  parameters: {
    docs: {
      source: {
        code: OverviewDashboardSource,
        language: 'tsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
