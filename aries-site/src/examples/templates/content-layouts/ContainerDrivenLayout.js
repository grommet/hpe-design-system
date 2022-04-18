import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CheckBoxGroup,
  Collapsible,
  Grid,
  Heading,
  Page,
  PageContent,
  ResponsiveContext,
  Text,
  ThemeContext,
} from 'grommet';
import { FormDown, FormNext } from 'grommet-icons';

import { PageHeader } from '..';

const allApps = require('../../../data/mockData/applications.json');

const CATEGORIES = [
  {
    value: 'Machine Learning',
    label: <Text>Machine Learning</Text>,
  },
  {
    value: 'Big Data',
    label: <Text>Big Data</Text>,
  },
  {
    value: 'Data Analytics',
    label: <Text>Data Analytics</Text>,
  },
  {
    value: 'Data Protection',
    label: <Text>Data Protection</Text>,
  },
  {
    value: 'Database',
    label: <Text>Database</Text>,
  },
  {
    value: 'Developer Tools',
    label: <Text>Developer Tools</Text>,
  },
  {
    value: 'Monitoring',
    label: <Text>Monitoring</Text>,
  },
];

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
    }

    if (filters.categories) {
      filters.categories.forEach(category => {
        const matches = allApps.filter(app =>
          app.categories.includes(category),
        );
        matches.forEach(match => results.push(match));
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
      <FilterPanel setFilters={setFilters} />
      <AppResults apps={filteredApps} />
    </Grid>
  );
};

const FilterPanel = ({ setFilters }) => {
  const breakpoint = useContext(ResponsiveContext);
  const [expand, setExpand] = useState(true);

  const filterOptions = (
    <Box
      align="start"
      background="background-front"
      gap="small"
      pad={{ right: 'small', vertical: 'small' }}
      round="xsmall"
    >
      <>
        <Button
          label="Categories"
          icon={expand ? <FormDown /> : <FormNext />}
          onClick={() => setExpand(!expand)}
        />
        <Collapsible open={expand}>
          <CheckBoxGroup
            options={CATEGORIES}
            onChange={({ value }) => {
              setFilters({ categories: value });
            }}
          />
        </Collapsible>
      </>
      <Button label="Publishers" icon={<FormNext />} onClick={() => {}} />
      <Button label="Delivery Methods" icon={<FormNext />} onClick={() => {}} />
      <Button label="Pricing Models" icon={<FormNext />} onClick={() => {}} />
    </Box>
  );

  return ['xsmall', 'small'].includes(breakpoint) ? 'yo' : filterOptions;
};

FilterPanel.propTypes = {
  setFilters: PropTypes.func,
};

const appGrid = {
  columns: {
    xsmall: 'auto',
    small: ['auto', 'auto'],
    medium: { count: 'fit', size: ['1/2', 'auto'] },
    large: { count: 'fit', size: ['1/3', 'auto'] },
    xlarge: { count: 'fit', size: ['1/4', 'auto'] },
  },
  rows: 'small',
  gap: {
    xsmall: 'medium',
    small: 'small',
    medium: 'small',
    large: 'medium',
    xlarge: 'medium',
  },
};

const AppResults = ({ apps }) => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Box gap="medium">
      <Heading level={2} size="small" margin="none">
        Apps
      </Heading>
      <Grid
        columns={appGrid.columns[breakpoint]}
        rows={appGrid.rows}
        gap={appGrid.gap[breakpoint]}
      >
        {apps?.map(app => (
          <Card key={app.id} fill />
        ))}
      </Grid>
    </Box>
  );
};

AppResults.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.object),
};
