// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useMemo, useState } from 'react';
import type { ComponentProps } from 'react';
import {
  Box,
  Button,
  Grid,
  Main,
  Page,
  PageContent,
  PageHeader,
  ResponsiveContext,
} from 'grommet';
import {
  Apps,
  Beacon,
  Cloud,
  Configure,
  Console,
  Cube,
  Storage,
  VirtualStorage,
} from '@hpe-design/icons-grommet';
import type { User } from '../global-header';
import { defaultUser, GlobalHeader, UserContext } from '../global-header';
import { AppContainer } from '../page-layouts/components';
import { SideNav } from '../side-nav';
import {
  DiscoverServices,
  HealthOverview,
  WeekAtAGlance,
} from './content';
import { pageBackground, surfaceBackground } from './content/overview/data';

const navigation = [
  { label: 'Workloads', icon: <Cube /> },
  { label: 'Console', icon: <Console /> },
  { label: 'Applications', icon: <Apps /> },
  { label: 'Cloud services', icon: <Cloud /> },
  { label: 'Storage', icon: <Storage /> },
  { label: 'Virtual storage', icon: <VirtualStorage /> },
  { label: 'Monitoring', icon: <Beacon /> },
];

type ShellLayout = Pick<
  ComponentProps<typeof Grid>,
  'areas' | 'columns' | 'rows'
>;

const shell: {
  withNav: ShellLayout;
  withoutNav: ShellLayout;
} = {
  withNav: {
    columns: ['auto', 'flex'],
    rows: ['auto', 'flex'],
    areas: [
      ['header', 'header'],
      ['nav', 'main'],
    ],
  },
  withoutNav: {
    columns: ['flex'],
    rows: ['auto', 'flex'],
    areas: [['header'], ['main']],
  },
};

export const OverviewDashboard = () => {
  const size = useContext(ResponsiveContext);
  const [user, setUser] = useState<User | undefined>(defaultUser);
  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  // On small screens the navigation would move into a drawer opened from
  // the global header; it is omitted here to keep the example focused.
  const showNav = !['xsmall', 'small'].includes(size);
  const { areas, columns, rows } = showNav ? shell.withNav : shell.withoutNav;

  return (
    <UserContext.Provider value={contextValue}>
      <AppContainer background={pageBackground}>
        <Grid columns={columns} rows={rows} areas={areas}>
          <Box gridArea="header">
            <GlobalHeader />
          </Box>
          {showNav && (
            <SideNav
              items={navigation}
              background={surfaceBackground}
              gridArea="nav"
            />
          )}
          <Main gridArea="main">
            <Page pad={{ bottom: '3xlarge' }}>
              {/* PageHeader pads medium below; with the medium gap = 48px. */}
              <PageContent gap="medium">
                <PageHeader
                  title="Home"
                  actions={
                    <Button label="Customize" icon={<Configure />} secondary />
                  }
                />
                <Box gap="xlarge">
                  <HealthOverview />
                  <WeekAtAGlance />
                  <DiscoverServices />
                </Box>
              </PageContent>
            </Page>
          </Main>
        </Grid>
      </AppContainer>
    </UserContext.Provider>
  );
};
