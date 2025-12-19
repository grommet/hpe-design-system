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
  Text,
  Toolbar,
  Menu,
  Pagination as GrommetPagination,
} from 'grommet';
import { ContentPane } from '../../../layouts';

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
    <ContentPane gap="medium">
      <Heading id="application-heading" level={2} margin="none">
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
      >
        <Toolbar gap="medium">
          <Toolbar>
            <DataSearch />
            <DataSort drop />
            <DataFilters layer />
          </Toolbar>
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
        <ResultsWrapper>
          <DataTable
            aria-describedby="application-heading"
            columns={columns}
            sortable
          />
          <Pagination />
        </ResultsWrapper>
      </Data>
    </ContentPane>
  );
};

const ResultsWrapper = ({ ...rest }) => (
  // style needed to ensure pagination controls stay aligned with datatable
  (<Box align="start">
    <Box style={{ display: 'inline-block' }} {...rest} />
  </Box>)
);

const step = 10;
const Pagination = () => {
  const { view, total } = useContext(DataContext);
  const page = view?.page || 1;

  return (
    <Box direction="row">
      <Box
        align="center"
        border="top"
        direction="row"
        justify="between"
        gap="xsmall"
        pad={{ vertical: '3xsmall', horizontal: 'xsmall' }}
        // in order to align with DataTable
        flex="grow"
        width="0"
        wrap
      >
        <Box flex="grow">
          <Text>
            {`Showing ${(page - 1) * step + 1}-${Math.min(
              page * step,
              total,
            )} of ${total} items`}
          </Text>
        </Box>
        <Box direction="row" justify="center">
          <GrommetPagination />
        </Box>
      </Box>
    </Box>
  );
};
