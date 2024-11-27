import React, { useContext } from 'react';
import {
  Box,
  Data,
  DataFilters,
  DataSearch,
  DataSummary,
  Grid,
  Heading,
  List,
  Page,
  PageContent,
  ResponsiveContext,
  Text,
  Toolbar,
} from 'grommet';
import { TextEmphasis } from 'aries-core';
import { Deliver, Package, StatusCritical, StatusGood } from 'grommet-icons';

import { orders } from './mockData';

const statusIcons = {
  Cancelled: <StatusCritical />,
  Delivered: <StatusGood />,
  'In transit': <Deliver />,
  'Ready to ship': <Package />,
};

// Define Data properties
const properties = {
  service: { label: 'Service' },
  status: { label: 'Status' },
  tenant: { label: 'Tenant' },
};

export const FilteringLists = () => (
  <Page>
    <PageContent gap="medium">
      <Heading level={2} margin="none">
        Orders
      </Heading>
      <Grid
        // Use Grid with height prop for sticky header and scrollable results
        height={{ min: 'medium' }}
      >
        <Data data={orders} properties={properties}>
          <Toolbar>
            <DataSearch responsive />
            <DataFilters layer />
          </Toolbar>
          <DataSummary />
          <Orders />
        </Data>
      </Grid>
    </PageContent>
  </Page>
);

const Orders = () => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Box
      flex
      overflow="auto"
      // xxsmall pad allows for List to receive focus properly
      pad="xxsmall"
    >
      <List
        aria-label="Orders"
        action={(item, index) => (
          <Box key={index} align="center" direction="row" gap="small">
            {!['xsmall', 'small'].includes(breakpoint) && (
              <Text color="text-strong">{item.status}</Text>
            )}
            {statusIcons[item.status]}
          </Box>
        )}
        border="horizontal"
        onClickItem={() => {
          // eslint-disable-next-line no-alert
          alert(`
            Typically a click would route to a view with 
            greater detail behind this summary information.
            `);
        }}
      >
        {(datum, index) => (
          <Box gap="xsmall" justify="between" key={index}>
            <TextEmphasis size="large">{datum.name}</TextEmphasis>
            <Text color="text-strong">
              {datum.tenant} | {datum.service}
            </Text>
          </Box>
        )}
      </List>
    </Box>
  );
};
