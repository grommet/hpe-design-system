import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Header, Heading, List, ResponsiveContext, Text } from 'grommet';
import { Deliver, Package, StatusCritical, StatusGood } from 'grommet-icons';

import {
  FilterControls,
  FiltersProvider,
  useFilters,
} from '../../FilterControls';
import { orders } from './mockData';

const statusIcons = {
  Cancelled: <StatusCritical />,
  Delivered: <StatusGood />,
  'In Transit': <Deliver />,
  'Ready to Ship': <Package />,
};

export const FilteringLists = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.

  // Define which attributes should be made available for the user
  // to filter upon
  const filtersConfig = [
    {
      property: 'service',
      label: 'Service',
      filterType: 'CheckBoxGroup',
      // contentProps accept any Grommet Box props to customize the Box
      // containing the FormField. https://v2.grommet.io/formfield#contentProps
      contentProps: { width: 'small' },
    },
    {
      property: 'status',
      label: 'Status',
      filterType: 'CheckBoxGroup',
      contentProps: { width: 'small' },
    },
    {
      property: 'tenant',
      label: 'Tenant',
      filterType: 'CheckBoxGroup',
      contentProps: { width: 'small' },
    },
  ];

  // Customize layer properties. Any Grommet Layer props, plus Box props
  // for the Layer's container and contents.
  const layerProps = {
    // containerProps accept any Grommet Box props to customize the Box
    // containing the layer's header, main content, and footer
    containerProps: {
      fill: false,
      pad: { horizontal: 'medium', vertical: 'small' },
      width: 'large',
    },
    // contentProps accept any Grommet Box props to customize the Box
    // containing the FormField filters.
    contentProps: {
      direction: 'row',
      justify: 'between',
      pad: { horizontal: 'medium' },
    },
    full: false,
    // containerRef is for demonstration purposes on this site. Most
    // implementations should likely remove.
    target: containerRef && containerRef.current,
    position: 'center',
  };

  return (
    <Box background="background" pad="large" gap="medium">
      <Header gap="small">
        <Heading level={2} margin="none">
          Orders
        </Heading>
      </Header>
      <FiltersProvider>
        <Box gap="medium">
          <FilterControls
            data={orders}
            filters={filtersConfig}
            layerProps={layerProps}
            searchFilter={{ placeholder: 'Search orders...' }}
          />
          <Orders />
        </Box>
      </FiltersProvider>
    </Box>
  );
};

FilteringLists.propTypes = {
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

const Orders = () => {
  const size = useContext(ResponsiveContext);
  const { filteredResults } = useFilters();

  return (
    <Box
      fill
      overflow="auto"
      pad={{ horizontal: 'xxsmall', bottom: 'medium', top: 'xxsmall' }}
    >
      <List
        action={(item, index) => (
          <Box key={index} align="center" direction="row" gap="small">
            {size !== 'small' && <Text color="text-strong">{item.status}</Text>}
            {statusIcons[item.status]}
          </Box>
        )}
        border="horizontal"
        data={filteredResults}
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
