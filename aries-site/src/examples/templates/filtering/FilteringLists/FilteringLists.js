import React, { useContext } from 'react';
import {
  Box,
  Data,
  DataFilters,
  DataSearch,
  DataSummary,
  Heading,
  List,
  Page,
  PageContent,
  ResponsiveContext,
  Text,
  Toolbar,
} from 'grommet';
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
  <Page fill>
    <PageContent>
      <Box gap="medium">
        <Heading level={2} margin="none">
          Orders
        </Heading>
        <Box fill>
          <Data
            data={orders}
            updateOn="submit"
            height={{ min: 'medium', max: '100%' }}
            properties={properties}
          >
            <Toolbar>
              <DataSearch />
              <DataFilters layer />
            </Toolbar>
            <DataSummary />
            <Orders />
          </Data>
        </Box>
      </Box>
    </PageContent>
  </Page>
);

const Orders = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Box
      flex
      overflow="auto"
      // xxsmall pad allows for List to receive focus properly
      pad="xxsmall"
    >
      <List
        action={(item, index) => (
          <Box key={index} align="center" direction="row" gap="small">
            {!['xsmall', 'small'].includes(size) && (
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
            <Text color="text-strong" size="large" weight="bold">
              {datum.name}
            </Text>
            <Text color="text-strong">
              {datum.tenant} | {datum.service}
            </Text>
          </Box>
        )}
      </List>
    </Box>
  );
};
