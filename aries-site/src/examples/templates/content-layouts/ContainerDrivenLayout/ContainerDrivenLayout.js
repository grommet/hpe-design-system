import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Collapsible,
  Data,
  DataFilters,
  DataFilter,
  Grid,
  Page,
  PageContent,
  PageHeader,
  ResponsiveContext,
  ThemeContext,
} from 'grommet';

import { FormDown, FormNext } from 'grommet-icons';
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
  const [openCategories, setOpenCategories] = useState(false);
  const [openPublishers, setOpenPublishers] = useState(false);
  const [openDelivery, setOpenDelivery] = useState(false);
  const [openPricing, setOpenPricing] = useState(false);

  let sidebar;
  if (breakpoint === 'small' || breakpoint === 'xsmall') {
    sidebar = <DataFilters layer />;
  } else {
    sidebar = (
      <DataFilters>
        <Box
          align="start"
          background="background-front"
          gap="xsmall"
          pad={{ vertical: 'small' }}
        >
          <Button
            onClick={() => setOpenCategories(!openCategories)}
            label="Categories"
            icon={openCategories ? <FormDown /> : <FormNext />}
            // id -> passed to datafilter
          />
          <Collapsible open={openCategories}>
            <DataFilter property="categories" />
          </Collapsible>
          {/* datafilter api to wrap in form field or not (no label, no border) 
          -> caller can pass aria-labelledby + id */}

          <Button
            onClick={() => setOpenPublishers(!openPublishers)}
            label="Publishers"
            icon={openPublishers ? <FormDown /> : <FormNext />}
          />
          <Collapsible open={openPublishers}>
            <DataFilter property="publisher" />
          </Collapsible>
          <Button
            onClick={() => setOpenDelivery(!openDelivery)}
            label="Delivery methods"
            icon={openDelivery ? <FormDown /> : <FormNext />}
          />
          <Collapsible open={openDelivery}>
            <DataFilter property="delivery" />
          </Collapsible>
          <Button
            onClick={() => setOpenPricing(!openPricing)}
            label="Pricing models"
            icon={openPricing ? <FormDown /> : <FormNext />}
          />
          <Collapsible open={openPricing}>
            <DataFilter property="pricing" />
          </Collapsible>
        </Box>
      </DataFilters>
    );
  }

  return (
    <Data data={allApps} properties={properties} updateOn="change">
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
