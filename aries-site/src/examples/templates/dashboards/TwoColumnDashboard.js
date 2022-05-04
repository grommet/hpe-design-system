/* eslint-disable react/jsx-no-useless-fragment */
import React, { useContext } from 'react';
import {
  Box,
  Grid,
  Heading,
  Main,
  ResponsiveContext,
  Page,
  PageContent,
  PageHeader,
} from 'grommet';
import { AppContainer } from '../page-layouts/components';
import { ContentArea } from '../page-layouts/anatomy/components';
import {
  FirmwareBaselines,
  FirmwareStatus,
  RecentActivity,
  ServerAttention,
  ServerHealth,
  UpdatesAvaliable,
} from './content';

export function TwoColumnDashboard() {
  return <AppContainer background="background-back">
    <ContentArea title="Global Header" />
    <Page>
      <PageContent gap="large">
        <PageHeader title="Dashboard" />
        <Content />
      </PageContent>
    </Page>
    <ContentArea title="Global Footer" />
  </AppContainer>;
}

const parentGrid = {
  columns: {
    xsmall: '100%',
    small: '100%',
    medium: ['auto', ['small', 'medium']],
    large: ['auto', ['small', 'medium']],
    xlarge: ['auto', 'medium'],
  },
  gap: {
    xsmall: 'large',
    small: 'large',
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  },
};

const firstChildGrid = {
  columns: {
    xsmall: '100%',
    small: '100%',
    medium: '100%',
    large: [
      ['medium', 'auto'],
      ['small', 'medium'],
    ],
    xlarge: ['auto', ['small', 'medium']],
  },
  gap: 'medium',
};

const secondChildGrid = {
  columns: {
    xsmall: ['100%'],
    small: ['100%'],
    medium: ['100%'],
    large: [['auto', 'auto']],
    xlarge: [['auto', 'auto']],
  },
  rows: ['auto'],
  areas: {
    xsmall: [['firmwareStatus'], ['firmwareUpdates'], ['firmwareBaselines']],
    small: [['firmwareStatus'], ['firmwareUpdates'], ['firmwareBaselines']],
    medium: [['firmwareStatus'], ['firmwareUpdates'], ['firmwareBaselines']],
    large: [
      ['firmwareStatus', 'firmwareUpdates'],
      ['firmwareBaselines', 'firmwareBaselines'],
    ],
    xlarge: [
      ['firmwareStatus', 'firmwareBaselines'],
      ['firmwareUpdates', 'firmwareBaselines'],
    ],
  },
  gap: 'medium',
};

function Content() {
  const size = useContext(ResponsiveContext);

  return (
    <Main>
      <Grid columns={parentGrid.columns[size]} gap={parentGrid.gap[size]}>
        {/* RecentActivity is top priority content. At narrow breakpoints, 
        place as first content element. Otherwise, place in second column. */}
        {['xsmall', 'small'].includes(size) && <RecentActivity />}
        <Box gap="large">
          <Box gap="small">
            <Heading level={2} size="small" margin="none">
              Servers
            </Heading>
            <Grid
              columns={firstChildGrid.columns[size]}
              gap={firstChildGrid.gap}
            >
              <ServerHealth />
              <ServerAttention />
            </Grid>
          </Box>
          <Box gap="small">
            <Heading level={2} size="small" margin="none">
              Firmware
            </Heading>
            <Grid
              columns={secondChildGrid.columns[size]}
              rows={secondChildGrid.rows}
              areas={secondChildGrid.areas[size]}
              gap={secondChildGrid.gap}
            >
              <FirmwareStatus gridArea="firmwareStatus" />
              <UpdatesAvaliable gridArea="firmwareUpdates" />
              <FirmwareBaselines gridArea="firmwareBaselines" />
            </Grid>
          </Box>
        </Box>
        {!['xsmall', 'small'].includes(size) && (
          <Box gap="large">
            {/* fragment is used to create a gap spacing element 
            for alignment to column 1 */}
            <></>
            <RecentActivity />
          </Box>
        )}
      </Grid>
    </Main>
  );
}
