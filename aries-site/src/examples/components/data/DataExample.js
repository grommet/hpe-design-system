import React, { useContext } from 'react';
import {
  Box,
  Heading,
  Data,
  DataContext,
  DataFilters,
  DataSort,
  DataSearch,
  DataSummary,
  DataTable,
  DataTableColumns,
  DataView,
  Text,
  Toolbar,
  Menu,
  Pagination as GrommetPagination,
} from 'grommet';
import applications from '../../../data/mockData/applications.json';

const columns = [
  {
    property: 'title',
    header: 'Title',
    primary: true,
  },
  {
    property: 'publisher',
    header: 'Publisher',
    size: 'small',
  },
  {
    property: 'delivery',
    header: 'Delivery',
  },
  {
    property: 'pricing',
    header: 'Pricing',
  },
  {
    property: 'rating',
    header: 'Rating',
  },
];

const options = columns.map(column => ({
  property: column.property,
  label: column.header,
}));

export const DataExample = () => {
  return (
    <Box>
      <Heading id="application-heading" level={2}>
        Applications
      </Heading>
      <Data
        id="data-example"
        data={applications}
        properties={{
          title: { filter: false },
          publisher: { label: 'Publisher' },
          pricing: { label: 'Pricing' },
          delivery: { label: 'Delivery' },
          rating: { label: 'Rating', range: { min: 0, max: 5 } },
        }}
        views={[
          {
            name: 'Most popular',
            properties: {
              rating: { min: 4, max: 5 },
              pricing: ['Free'],
            },
          },
          {
            name: 'Needs attention',
            properties: {
              rating: { min: 3, max: 4 },
            },
          },
        ]}
      >
        <Toolbar gap="medium">
          <Toolbar>
            <DataSearch />
            <DataSort drop />
            <DataFilters layer />
          </Toolbar>
          <DataView />
          <DataTableColumns options={options} drop />
          <Box flex align="end">
            <Menu
              label="Actions"
              kind="toolbar"
              items={[
                {
                  label: 'Export as CSV',
                },
                {
                  label: 'Add application',
                },
              ]}
            />
          </Box>
        </Toolbar>
        <DataSummary />
        <DataTable
          alignSelf="start"
          aria-describedby="application-heading"
          columns={columns}
          sortable
        />
        <Pagination />
      </Data>
    </Box>
  );
};

const step = 10;

const Pagination = () => {
  const { view, total } = useContext(DataContext);
  const page = view?.page || 1;

  return (
    <Box
      align="center"
      border="top"
      direction="row"
      justify="between"
      gap="small"
      pad={{ vertical: 'xsmall', start: 'small' }}
      wrap
    >
      <Box flex>
        <Text>{`Showing ${(page - 1) * step + 1}-${Math.min(
          page * step,
          total,
        )} of ${total}`}</Text>
      </Box>
      <GrommetPagination alignSelf="end" />
    </Box>
  );
};
