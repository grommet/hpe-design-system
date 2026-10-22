// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import {
  Anchor,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  Heading,
  List,
  Text,
} from 'grommet';
import { LinkNext, Right } from '@hpe-design/icons-grommet';
import {
  distribute,
  limitRegions,
  Service,
  serviceCount,
} from './content/myServices';

const TITLE = 'My services';

export interface MyServicesWidgetProps {
  /** Card width; maps to the dashboard's small, medium and large widget sizes. */
  width?: 'medium' | 'xlarge' | 'xxlarge';
  /** Number of columns the region groups flow into. */
  columns?: number;
  /** Maximum service rows to show before a "View all" footer appears. */
  limit?: number;
}

/**
 * Dashboard widget listing a user's services grouped by region.
 *
 * Every service is a full-width, clickable List row with a trailing chevron.
 * The row (not the text) is the target, so hover and focus states come from
 * the theme and the eye reads "a list of things to open" rather than a
 * paragraph of underlined links.
 */
export const MyServicesWidget = ({
  width = 'medium',
  columns = 1,
  limit = Infinity,
}: MyServicesWidgetProps) => {
  const visible = limitRegions(limit);
  const truncated = limit < serviceCount;
  const groups = distribute(visible, columns, r => r.services.length + 1);

  return (
    <Card width={width}>
      <CardHeader align="center">
        <Heading level={2} margin="none">
          {TITLE}
        </Heading>
        <Button
          icon={<LinkNext color="icon-primary" />}
          a11yTitle={`Go to ${TITLE}`}
          href="/services"
          onClick={event => event.preventDefault()}
        />
      </CardHeader>
      {/* Header already pads the shared edge, so the body starts flush. */}
      <CardBody pad={{ horizontal: 'small', bottom: 'medium', top: 'none' }}>
        <Grid columns={{ count: columns, size: 'auto' }} gap="medium">
          {groups.map(column => (
            <Box key={column[0].name} gap="medium">
              {column.map(region => (
                <Box key={region.name} gap="xsmall">
                  <Box pad={{ horizontal: 'small' }}>
                    <Text size="small" color="text-default">
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
      </CardBody>
      {truncated && (
        <CardFooter
          border={{ side: 'top', color: 'border-weak' }}
          justify="end"
        >
          <Anchor
            label={`View all ${serviceCount} services`}
            href="/services"
            onClick={event => event.preventDefault()}
          />
        </CardFooter>
      )}
    </Card>
  );
};
