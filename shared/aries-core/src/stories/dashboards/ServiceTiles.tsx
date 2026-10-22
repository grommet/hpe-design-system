// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Button, Grid, Text } from 'grommet';
import { WidgetCard, WidgetProps } from './content/WidgetCard';
import {
  distribute,
  limitRegions,
  serviceCount,
  serviceIcon,
} from './content/myServices';

/**
 * Dashboard widget listing a user's services grouped by region.
 *
 * Each service is a small bordered tile (icon + name) that wraps beneath its
 * region heading. The affordance is the shape itself: a contained surface
 * with a hover fill looks pressable at a glance, and the services sit as a
 * compact cluster per region rather than a vertical run.
 */
export const ServiceTiles = ({
  width = 'medium',
  columns = 1,
  limit = Infinity,
}: WidgetProps) => {
  const visible = limitRegions(limit);
  const groups = distribute(visible, columns, r => r.services.length + 1);

  return (
    <WidgetCard width={width} truncated={limit < serviceCount}>
      <Grid columns={{ count: columns, size: 'auto' }} gap="medium">
        {groups.map(column => (
          <Box key={column[0].name} gap="medium">
            {column.map(region => (
              <Box key={region.name} gap="xsmall">
                <Text size="small" color="text-strong">
                  {region.name}
                </Text>
                <Box direction="row" wrap gap="xsmall">
                  {region.services.map(service => {
                    const Icon = serviceIcon(service.name);
                    return (
                      <Button
                        key={service.name}
                        plain
                        href={service.href}
                        onClick={event => event.preventDefault()}
                      >
                        {({ hover }: { hover: boolean }) => (
                          <Box
                            direction="row"
                            align="center"
                            gap="xsmall"
                            pad={{ horizontal: 'small', vertical: 'xsmall' }}
                            border={{ color: 'border-weak' }}
                            round="xsmall"
                            background={hover ? 'background-hover' : undefined}
                          >
                            <Icon color="icon-default" />
                            <Text weight={500} color="text-strong">
                              {service.name}
                            </Text>
                          </Box>
                        )}
                      </Button>
                    );
                  })}
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Grid>
    </WidgetCard>
  );
};
