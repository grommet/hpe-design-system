import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Cards,
  Data,
  DataChart,
  DataFilters,
  DataFilter,
  DataSearch, // probably do not need
  DataSummary,
  Grid,
  Page,
  PageContent,
  PageHeader,
  ResponsiveContext,
  ThemeContext,
  // REMOVE ME LATER
  Box,
  List,
  Text,
} from 'grommet';

import { AppResults } from './AppResults';
import { FilterPanel } from './FilterPanel';
// import allApps from '../../../../data/mockData/applications.json';

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
      { label: 'Big Data', value: 'Big Data' },
      // do the same as for below, but first need to show results
      'Data Protection',
      'Data analytics',
      'Database',
      'Developer tools',
      'Machine learning',
      'Monitoring',
    ],
  },
  publisher: {
    label: 'Publishers',
  },
  delivery: { label: 'Delivery Methods' },
  pricing: { label: 'Pricing Models' },
};

const ContentLayout = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const breakpoint = useContext(ResponsiveContext);
  // const [filteredApps, setFilteredApps] = useState(allApps);
  const [filters, setFilters] = useState({});

  // apply filters
  // useEffect(() => {
  //   let results = [];
  //   let numFilters = 0;
  //   Object.values(filters).forEach(filter => (numFilters += filter.length));

  //   if (numFilters === 0) {
  //     results = allApps;
  //   } else {
  //     results = allApps.filter(app => {
  //       let result = true;
  //       Object.keys(filters).forEach(key => {
  //         if (filters[key].length > 0) {
  //           const match = filters[key].some(item => app[key].includes(item));
  //           if (match === false) {
  //             result = false;
  //           }
  //         }
  //       });
  //       return result;
  //     });
  //   }

  //   setFilteredApps(
  //     results.reduce((acc, cur) => {
  //       if (!acc.includes(cur)) {
  //         acc.push(cur);
  //       }
  //       return acc;
  //     }, []),
  //   );
  // }, [filters, setFilteredApps]);

  let sidebar;
  if (breakpoint === 'small' || breakpoint === 'xsmall') {
    sidebar = <DataFilters drop />;
  } else {
    sidebar = <DataFilters />;
  }

  return (
    //   {/* <FilterPanel
    //   data={allApps}
    //   setFilters={setFilters}
    //   containerRef={containerRef}
    // /> */}

    // keep the clear filters button to remove selected
    <Data data={allApps} properties={properties} updateOn="change">
      <Grid
        align="start"
        columns={pageContentGrid.columns[breakpoint]}
        gap={pageContentGrid.gap[breakpoint]}
      >
        {/* <DataFilters drop /> */}
        {sidebar}
        <AppResults />
      </Grid>
    </Data>
  );
};

ContentLayout.propTypes = {
  containerRef: PropTypes.object,
};
