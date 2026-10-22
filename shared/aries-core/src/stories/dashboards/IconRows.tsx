// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Grid, List, Text } from 'grommet';
import { WidgetCard, WidgetProps } from './content/WidgetCard';
import {
  distribute,
  limitRegions,
  Service,
  serviceCount,
  serviceIcon,
} from './content/myServices';

/**
 * Dashboard widget listing a user's services grouped by region.
 *
 * Each service is a clickable List row led by its service icon and separated
 * by a hairline divider. The icon turns a line of text into an identifiable
 * object, and the divider frames each row as a discrete item, so the list
 * reads as "things to open" without needing a trailing chevron.
 */
export const IconRows = ({
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
                <List
                  a11yTitle={`${region.name} services`}
                  data={region.services}
                  itemKey="name"
                  onClickItem={() => {}}
                  border={{ side: 'bottom', color: 'border-weak' }}
                  defaultItemProps={{
                    pad: { horizontal: 'none', vertical: 'small' },
                  }}
                  itemProps={{
                    [region.services.length - 1]: { border: false },
                  }}
                >
                  {(service: Service) => {
                    const Icon = serviceIcon(service.name);
                    return (
                      <Box direction="row" align="center" gap="small">
                        <Icon color="icon-default" />
                        <Text weight={500} color="text-strong">
                          {service.name}
                        </Text>
                      </Box>
                    );
                  }}
                </List>
              </Box>
            ))}
          </Box>
        ))}
      </Grid>
    </WidgetCard>
  );
};
