import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Collapsible,
  Data,
  DataFilter,
  DataFilters,
  Grid,
  Page,
  PageContent,
  PageHeader,
  ResponsiveContext,
  ThemeContext,
} from 'grommet';

import { Down, Right } from '@hpe-design/icons-grommet';
import { AppResults } from './AppResults';

const allApps = require('../../../../data/mockData/applications.json');

const pageContentGrid = {
  columns: {
    xsmall: 'auto',
    small: 'auto',
    medium: [['small', '1/3'], 'flex'],
    large: [['20%', '25%'], 'flex'],
    xlarge: [['1/4', 'medium'], 'flex'],
  },
  gap: {
    xsmall: 'medium',
    small: 'medium',
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  },
};

export const ContainerDrivenLayout = () => {
  const theme = useContext(ThemeContext);

  return (
    <Page
      background="background-back"
      flex="grow"
      gap="xlarge"
      pad={{ bottom: 'xlarge' }}
    >
      <PageContent
        background={{
          fill: 'horizontal',
          color: theme.dark
            ? theme.global.colors['background-front']
            : theme.global.colors['background-back'].dark,
        }}
      >
        <PageHeader
          title="App catalog"
          subtitle={`Browse, search, and discover all the wonderful apps we 
          have for you.`}
          pad={{ vertical: 'xlarge' }}
        />
      </PageContent>
      <PageContent>
        <ContentLayout />
      </PageContent>
    </Page>
  );
};

const properties = {
  categories: {
    label: 'Categories',
    options: [
      { label: 'Machine Learning', value: 'Machine learning' },
      { label: 'Big Data', value: 'Big Data' },
      { label: 'Data Analytics', value: 'Data analytics' },
      { label: 'Developer Tools', value: 'Developer tools' },
      { label: 'Monitoring', value: 'Monitoring' },
      { label: 'Database', value: 'Database' },
      { label: 'Data Protection', value: 'Data Protection' },
    ],
  },
  publisher: {
    label: 'Publishers',
  },
  delivery: { label: 'Delivery Methods' },
  pricing: { label: 'Pricing Models' },
};

const Filter = ({ label, expand, setExpand, property }) => {
  return (
    <>
      <Button
        label={label}
        icon={expand ? <Down /> : <Right />}
        onClick={() => setExpand(!expand)}
      />
      <Collapsible open={expand}>
        <Box pad={{ left: 'medium', top: '3xsmall' }}>
          <DataFilter property={property} />
        </Box>
      </Collapsible>
    </>
  );
};

Filter.propTypes = {
  label: PropTypes.string.isRequired,
  expand: PropTypes.bool.isRequired,
  setExpand: PropTypes.func.isRequired,
  property: PropTypes.string.isRequired,
};

const ContentLayout = () => {
  const breakpoint = useContext(ResponsiveContext);
  const showFiltersButton = ['xsmall', 'small'].includes(breakpoint);

  const [expandCategory, setExpandCategory] = useState(false);
  const [expandPublishers, setExpandPublishers] = useState(false);
  const [expandDelivery, setExpandDelivery] = useState(false);
  const [expandPricing, setExpandPricing] = useState(false);

  const sidebar = showFiltersButton ? (
    <DataFilters layer />
  ) : (
    <Box
      direction="column"
      align="start"
      gap="xsmall"
      background="background-front"
      pad={{ right: 'xsmall', vertical: 'xsmall' }}
      round="xsmall"
    >
      <Filter
        label="Categories"
        expand={expandCategory}
        setExpand={setExpandCategory}
        property="categories"
      />
      <Filter
        label="Publishers"
        expand={expandPublishers}
        setExpand={setExpandPublishers}
        property="publisher"
      />
      <Filter
        label="Delivery Methods"
        expand={expandDelivery}
        setExpand={setExpandDelivery}
        property="delivery"
      />
      <Filter
        label="Pricing Models"
        expand={expandPricing}
        setExpand={setExpandPricing}
        property="pricing"
      />
    </Box>
  );

  return (
    <Data
      data={allApps}
      properties={properties}
      updateOn={showFiltersButton ? undefined : 'change'}
    >
      <Grid
        align="start"
        columns={pageContentGrid.columns[breakpoint]}
        gap={pageContentGrid.gap[breakpoint]}
      >
        {sidebar}
        <AppResults />
      </Grid>
    </Data>
  );
};
