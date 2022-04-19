import { useContext, useEffect, useState } from 'react';
import {
  Grid,
  Page,
  PageContent,
  ResponsiveContext,
  ThemeContext,
} from 'grommet';

import { PageHeader } from '../..';
import { AppResults } from './AppResults';
import { FilterPanel } from './FilterPanel';

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
        <ContentLayout />
      </PageContent>
    </Page>
  );
};

const ContentLayout = () => {
  const breakpoint = useContext(ResponsiveContext);
  const [filteredApps, setFilteredApps] = useState(allApps);
  const [filters, setFilters] = useState({});

  // apply filters
  useEffect(() => {
    let results = [];
    let numFilters = 0;
    Object.values(filters).forEach(filter => (numFilters += filter.length));

    if (numFilters === 0) {
      results = allApps;
    } else {
      results = allApps.filter(app => {
        let result = true;
        Object.keys(filters).forEach(key => {
          if (filters[key].length > 0) {
            const match = filters[key].some(item => app[key].includes(item));
            if (match === false) {
              result = false;
            }
          }
        });
        return result;
      });
    }

    setFilteredApps(
      results.reduce((acc, cur) => {
        if (!acc.includes(cur)) {
          acc.push(cur);
        }
        return acc;
      }, []),
    );
  }, [filters, setFilteredApps]);

  return (
    <Grid
      align="start"
      columns={pageContentGrid.columns[breakpoint]}
      gap={pageContentGrid.gap[breakpoint]}
    >
      <FilterPanel data={allApps} filters={filters} setFilters={setFilters} />
      <AppResults apps={filteredApps} />
    </Grid>
  );
};
