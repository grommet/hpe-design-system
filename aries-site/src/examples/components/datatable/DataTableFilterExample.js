import React, { useContext } from 'react';
import {
  Box,
  Data,
  DataTable,
  DataContext,
  DataClearFilters,
  DataFilter,
  DataFilters,
  DataSearch,
  DataSummary,
  Heading,
  Page,
  PageContent,
  Toolbar,
  Pagination,
} from 'grommet';
import { ContentPane } from '../../../layouts/content/ContentPane';
import applications from '../../../data/mockData/applications.json';

const properties = {
  title: { filter: false },
  publisher: { label: 'Publisher' },
  delivery: { label: 'Delivery', filter: false, badge: false },
  pricing: { label: 'Pricing' },
  rating: { label: 'Rating', range: { min: 0, max: 5 } },
};

const columns = [
  {
    property: 'title',
    header: 'Title',
    primary: true,
  },
  {
    property: 'publisher',
    header: 'Publisher',
    size: 'xsmall',
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

export const DataTableFilterExample = () => (
  <Page>
    <PageContent>
      <ContentPane>
        <Heading level={2}>
          Apply a filter via the filter icon button in the toolbar
        </Heading>
        <Data data={applications} properties={properties}>
          <ComposedToolbar />
          <DataSummary />
          <DataTable aria-describedby="storage-heading" columns={columns} />
          <Box border="top" pad={{ vertical: '3xsmall' }}>
            <Pagination summary stepOptions />
          </Box>
        </Data>
      </ContentPane>
    </PageContent>
  </Page>
);

const ComposedToolbar = () => {
  const { view } = useContext(DataContext);
  return (
    <Toolbar gap="medium" align="end">
      <Toolbar align="end">
        <DataSearch />
        <DataFilters layer clearFilters={false}>
          {Object.keys(properties).map(k =>
            properties[k].filter !== false ? (
              <DataFilter key={k} property={k} />
            ) : undefined,
          )}
        </DataFilters>
        {view?.properties !== undefined &&
        Object.keys(view?.properties).length !== 0 ? (
          <DataClearFilters />
        ) : null}
      </Toolbar>
    </Toolbar>
  );
};
