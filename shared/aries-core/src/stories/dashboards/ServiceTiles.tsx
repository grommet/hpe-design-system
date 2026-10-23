// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Button, Grid, Text } from 'grommet';
import { WidgetCard, WidgetProps } from './content/WidgetCard';
import { RegionHeading } from './content/ServiceRow';
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
              <Box key={region.name} gap="3xsmall">
                <RegionHeading name={region.name} />
                {/* Align tile edges with the heading's indent. */}
                <Box
                  direction="row"
                  wrap
                  gap="xxsmall"
                  pad={{ horizontal: 'small' }}
                >
                  {region.services.map(service => {
                    const Icon = serviceIcon(service.name);
                    return (
                      <Button
                        key={service.name}
                        plain
                        href={service.href}
                        onClick={event => event.preventDefault()}
                      >
                        {({
                          hover,
                          focus,
                        }: {
                          hover: boolean;
                          focus: boolean;
                        }) => {
                          const color = hover || focus ? 'text-strong' : 'text';
                          return (
                            <Box
                              direction="row"
                              align="center"
                              gap="xxsmall"
                              pad={{
                                vertical: '3xsmall',
                                horizontal: 'xxsmall',
                              }}
                              border={{ color: 'border-weak' }}
                              round="small"
                              background={
                                hover ? 'background-hover' : undefined
                              }
                            >
                              <Icon color={color} aria-hidden="true" />
                              <Text color={color}>{service.name}</Text>
                            </Box>
                          );
                        }}
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
