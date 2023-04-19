import { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Data,
  DataFilters,
  Grid,
  Page,
  PageContent,
  PageHeader,
  ResponsiveContext,
  ThemeContext,
} from 'grommet';

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

export const ContainerDrivenLayout = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const theme = useContext(ThemeContext);

  return (
    <Page
      background="background-back"
      flex="grow"
      gap="large"
      pad={{ bottom: 'large' }}
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
          title="App Catalog"
          subtitle={`Browse, search, and discover all the wonderful apps we 
          have for you.`}
          pad={{ vertical: 'large' }}
        />
      </PageContent>
      <PageContent>
        <ContentLayout containerRef={containerRef} />
      </PageContent>
    </Page>
  );
};

ContainerDrivenLayout.propTypes = {
  containerRef: PropTypes.object,
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

const ContentLayout = () => {
  const breakpoint = useContext(ResponsiveContext);
  const showFiltersButton = breakpoint === 'small' || breakpoint === 'xsmall';
  const sidebar = <DataFilters layer={showFiltersButton ? true : undefined} />;

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
