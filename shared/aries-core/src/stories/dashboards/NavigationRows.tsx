// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Grid } from 'grommet';
import { Right } from '@hpe-design/icons-grommet';
import { WidgetCard, WidgetProps } from './content/WidgetCard';
import { RegionHeading, ServiceRow, ServiceRows } from './content/ServiceRow';
import { distribute, limitRegions, serviceCount } from './content/myServices';

/**
 * Dashboard widget listing a user's services grouped by region.
 *
 * Every service is a full-width, clickable row with a trailing chevron.
 * Spacing, radius and hover treatment are borrowed from `NavigationMenu`
 * items so the widget reads as "a list of places to go" rather than a
 * paragraph of underlined links.
 */
export const NavigationRows = ({
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
          <Box key={column[0].name} gap="small">
            {column.map(region => (
              <Box key={region.name}>
                <RegionHeading name={region.name} />
                <ServiceRows region={`${region.name} services`}>
                  {region.services.map(service => (
                    <ServiceRow
                      key={service.name}
                      service={service}
                      trailing={<Right size="small" aria-hidden="true" />}
                    />
                  ))}
                </ServiceRows>
              </Box>
            ))}
          </Box>
        ))}
      </Grid>
    </WidgetCard>
  );
};
