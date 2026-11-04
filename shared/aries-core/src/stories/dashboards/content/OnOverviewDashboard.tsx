// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box } from 'grommet';
import { OverviewDashboard } from 'apps/docs/src/examples/templates/dashboards/OverviewDashboard';
import { surfaceBackground } from 'apps/docs/src/examples/templates/dashboards/content/overview/data';
import type { WidgetProps } from './WidgetCard';

interface OnOverviewDashboardProps extends WidgetProps {
  /** The widget treatment to place on the dashboard. */
  widget: React.ComponentType<WidgetProps>;
}

/**
 * Places a "My services" widget at the top of the Overview dashboard so each
 * list treatment can be judged in situ: white page, grey widget surfaces,
 * alongside the dashboard's existing cards.
 */
export const OnOverviewDashboard = ({
  widget: Widget,
  ...widgetProps
}: OnOverviewDashboardProps) => (
  <OverviewDashboard>
    <Box as="section">
      <Widget background={surfaceBackground} {...widgetProps} />
    </Box>
  </OverviewDashboard>
);
