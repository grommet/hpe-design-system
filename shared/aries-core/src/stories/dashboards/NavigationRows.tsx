// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Grid, List, Text } from 'grommet';
import { Right } from '@hpe-design/icons-grommet';
import { WidgetCard, WidgetProps } from './content/WidgetCard';
import {
  distribute,
  limitRegions,
  Service,
  serviceCount,
} from './content/myServices';

/**
 * Dashboard widget listing a user's services grouped by region.
 *
 * Every service is a full-width, clickable List row with a trailing chevron.
 * The row (not the text) is the target, so hover and focus states come from
 * the theme and the eye reads "a list of things to open" rather than a
 * paragraph of underlined links.
 */
export const NavigationRows = ({
  width = 'medium',
  columns = 1,
  limit = Infinity,
}: WidgetProps) => {
  const visible = limitRegions(limit);
  const groups = distribute(visible, columns, r => r.services.length + 1);

  return (
    <WidgetCard width={width} truncated={limit < serviceCount} bodyPad="small">
      <Grid columns={{ count: columns, size: 'auto' }} gap="medium">
        {groups.map(column => (
          <Box key={column[0].name} gap="medium">
            {column.map(region => (
              <Box key={region.name} gap="xsmall">
                <Box pad={{ horizontal: 'small' }}>
                  <Text size="small" color="text-strong">
                    {region.name}
                  </Text>
                </Box>
                <List
                  a11yTitle={`${region.name} services`}
                  data={region.services}
                  itemKey="name"
                  onClickItem={() => {}}
                  defaultItemProps={{
                    pad: { horizontal: 'small', vertical: 'xsmall' },
                    round: 'xsmall',
                  }}
                >
                  {(service: Service) => (
                    <Box
                      direction="row"
                      align="center"
                      justify="between"
                      gap="small"
                    >
                      <Text weight={500} color="text-strong">
                        {service.name}
                      </Text>
                      <Right size="small" />
                    </Box>
                  )}
                </List>
              </Box>
            ))}
          </Box>
        ))}
      </Grid>
    </WidgetCard>
  );
};
