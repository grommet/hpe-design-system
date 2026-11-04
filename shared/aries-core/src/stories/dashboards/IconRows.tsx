// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Grid } from 'grommet';
import { WidgetCard, WidgetProps } from './content/WidgetCard';
import { RegionHeading, ServiceRow, ServiceRows } from './content/ServiceRow';
import {
  distribute,
  limitRegions,
  serviceCount,
  serviceIcon,
} from './content/myServices';

/**
 * Dashboard widget listing a user's services grouped by region.
 *
 * Each service is a clickable row led by its service icon, spaced like a
 * `NavigationMenu` item. The icon turns a line of text into an identifiable
 * object, so the list reads as "things to open" without a trailing chevron.
 */
export const IconRows = ({
  width = 'medium',
  columns = 1,
  limit = Infinity,
  background,
}: WidgetProps) => {
  const visible = limitRegions(limit);
  const groups = distribute(visible, columns, r => r.services.length + 1);

  return (
    <WidgetCard
      width={width}
      truncated={limit < serviceCount}
      background={background}
      bodyPad="small"
    >
      <Grid columns={{ count: columns, size: 'auto' }} gap="medium">
        {groups.map(column => (
          <Box key={column[0].name} gap="medium">
            {column.map(region => (
              <Box key={region.name}>
                <RegionHeading name={region.name} />
                <ServiceRows region={`${region.name} services`}>
                  {region.services.map(service => {
                    const Icon = serviceIcon(service.name);
                    return (
                      <ServiceRow
                        key={service.name}
                        service={service}
                        icon={<Icon aria-hidden="true" />}
                      />
                    );
                  })}
                </ServiceRows>
              </Box>
            ))}
          </Box>
        ))}
      </Grid>
    </WidgetCard>
  );
};
