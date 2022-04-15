import { useContext, useState } from 'react';
import {
  Box,
  Button,
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
import { ContentArea } from '../page-layouts/anatomy/components';

const pageContentGrid = {
  columns: {
    xsmall: 'auto',
    small: 'auto',
    medium: [['small', '1/3'], 'flex'],
    large: [['small', 'auto'], 'flex'],
    xlarge: [['small', 'auto'], 'flex'],
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

  return (
    <Grid
      columns={pageContentGrid.columns[breakpoint]}
      gap={pageContentGrid.gap[breakpoint]}
    >
      <FilterPanel />
      <AppResults />
    </Grid>
  );
};

const FilterPanel = () => {
  const [expand, setExpand] = useState(true);

  return (
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
          <Box>
            <CheckBoxGroup
              options={[
                {
                  value: 'analytics',
                  label: <Text>AI/ML & Analytics</Text>,
                },
                {
                  value: 'big data',
                  label: <Text>Big Data</Text>,
                },
                {
                  value: 'data protection',
                  label: <Text>Data Protection</Text>,
                },
                {
                  value: 'database',
                  label: <Text>Database</Text>,
                },
                {
                  value: 'developer tools',
                  label: <Text>Developer Tools</Text>,
                },
                {
                  value: 'monitoring',
                  label: <Text>Monitoring</Text>,
                },
              ]}
            />
          </Box>
        </Collapsible>
      </>
      <Button label="Publishers" icon={<FormNext />} onClick={() => {}} />
      <Button label="Delivery Methods" icon={<FormNext />} onClick={() => {}} />
      <Button label="Pricing Models" icon={<FormNext />} onClick={() => {}} />
    </Box>
  );
};

const AppGrid = {
  columns: {
    xsmall: 'auto',
    small: ['auto', 'auto'],
    medium: { count: 'fit', size: ['1/2', 'auto'] },
    large: { count: 'fit', size: ['1/2', 'auto'] },
    xlarge: { count: 'fit', size: ['1/3', 'auto'] },
  },
  gap: {
    xsmall: 'medium',
    small: 'small',
    medium: 'small',
    large: 'medium',
    xlarge: 'medium',
  },
};

const AppResults = () => (
  <Box gap="medium">
    <Heading level={2} size="small" margin="none">
      Apps
    </Heading>
  </Box>
);
