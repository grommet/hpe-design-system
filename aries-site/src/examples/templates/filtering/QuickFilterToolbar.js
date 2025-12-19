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
  SelectMultiple,
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

export const QuickFilterToolbar = () => (
  <Page>
    <PageContent>
      <ContentPane>
        <Heading level={2} margin="none">
          Storage
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
        <DataFilters updateOn="change" clearFilters={false}>
          <DataFilter
            property="delivery"
            // override HPE theme margin to align with search + filter
            contentProps={{ margin: { bottom: 'none', top: '3xsmall' } }}
            // override Grommet theme margin to align with search + filter
            margin="none"
          >
            <SelectMultiple
              placeholder="Select delivery"
              options={['Package manager', 'License key', 'Web application']}
              name="delivery"
            />
          </DataFilter>
        </DataFilters>
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
