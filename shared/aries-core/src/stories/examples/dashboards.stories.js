// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { OverviewDashboard } from '../../js/examples/dashboards/overview/OverviewDashboard';
import OverviewDashboardSource from '../../js/examples/dashboards/overview/OverviewDashboard.tsx?raw';

const meta = {
  title: 'Examples/Dashboards/Overview',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export default meta;

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
