// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useMemo, useState } from 'react';
import type { ComponentProps, SetStateAction } from 'react';
import {
  Box,
  Button,
  CheckBox,
  Grid,
  Main,
  Nav,
  Page,
  PageContent,
  PageHeader,
  ResponsiveContext,
  Tab,
  Tabs,
} from 'grommet';
import {
  Apps,
  Beacon,
  Cloud,
  Console,
  Cube,
  Download,
  Sidebar,
  Storage,
  VirtualStorage,
} from '@hpe-design/icons-grommet';
import { defaultUser, GlobalHeader, UserContext } from '../global-header';
import { AppContainer } from '../page-layouts/components';
import {
  CarbonEmissionsCard,
  DevicesTable,
  EnergyByLocationCard,
  PowerDrawCard,
} from './content';
import { pageBackground, surfaceBackground } from './content/devices/data';

const navigation = [
  { label: 'Workloads', icon: <Cube /> },
  { label: 'Console', icon: <Console /> },
  { label: 'Applications', icon: <Apps /> },
  { label: 'Cloud services', icon: <Cloud /> },
  { label: 'Storage', icon: <Storage /> },
  { label: 'Virtual storage', icon: <VirtualStorage /> },
  { label: 'Monitoring', icon: <Beacon /> },
];

const shell: Record<
  'withNav' | 'withoutNav',
  Pick<ComponentProps<typeof Grid>, 'columns' | 'rows' | 'areas'>
> = {
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

// Tabbed summary above the collection. A single `detailed` flag is shared by
// every summary card so the "Detailed charts" switch expands or collapses
// them together.
function EnergySummary() {
  const [activeTab, setActiveTab] = useState(0);
  const [detailed, setDetailed] = useState(false);
  const showCharts = activeTab === 0;

  return (
    <Box as="section" gap="small">
      {/* The switch sits in a fixed-width container (as in the design) so the
          tabs flex to an exact width and never report a false overflow. */}
      <Box direction="row" align="center" justify="end" gap="small" wrap>
        <Tabs
          activeIndex={activeTab}
          onActive={setActiveTab}
          justify="start"
          flex="grow"
        >
          <Tab title="Power and energy" />
          <Tab title="Manage" />
        </Tabs>
        {showCharts && (
          <Box width="medium" align="end" flex={false}>
            <CheckBox
              toggle
              reverse
              label="Detailed charts"
              checked={detailed}
              onChange={event => setDetailed(event.target.checked)}
            />
          </Box>
        )}
      </Box>
      {showCharts && (
        <Grid columns={{ count: 'fit', size: 'small' }} gap="small">
          <PowerDrawCard detailed={detailed} />
          <EnergyByLocationCard detailed={detailed} />
          <CarbonEmissionsCard detailed={detailed} />
        </Grid>
      )}
    </Box>
  );
}

// Collapsed, icon-only primary navigation rail.
function SideNav({ ...rest }: Pick<ComponentProps<typeof Box>, 'gridArea'>) {
  return (
    <Box pad="xsmall" flex={false} {...rest}>
      <Nav
        a11yTitle="Primary"
        align="center"
        background={surfaceBackground}
        fill="vertical"
        gap="4xsmall"
        pad={{ vertical: '3xsmall' }}
        round="large"
        width="5xsmall"
      >
        <Button
          icon={<Sidebar />}
          a11yTitle="Expand navigation"
          tip="Expand navigation"
        />
        {navigation.map(({ icon, label }) => (
          <Button key={label} icon={icon} a11yTitle={label} tip={label} />
        ))}
      </Nav>
    </Box>
  );
}

export const DevicesCollection = () => {
  const size = useContext(ResponsiveContext);
  const [user, setUser] = useState<typeof defaultUser | undefined>(defaultUser);
  const contextValue = useMemo(
    () => ({
      user: user ?? {},
      setUser: (value?: SetStateAction<typeof defaultUser | undefined>) =>
        setUser(value),
    }),
    [user],
  );

  // On small screens the navigation would move into a drawer opened from
  // the global header; it is omitted here to keep the example focused.
  const showNav = size !== 'xsmall' && size !== 'small';
  const { areas, columns, rows } = showNav ? shell.withNav : shell.withoutNav;

  return (
    <UserContext.Provider value={contextValue}>
      <AppContainer background={pageBackground}>
        <Grid columns={columns} rows={rows} areas={areas}>
          <Box gridArea="header">
            <GlobalHeader />
          </Box>
          {showNav && <SideNav gridArea="nav" />}
          <Main gridArea="main">
            <Page pad={{ bottom: '3xlarge' }}>
              {/* PageHeader already pads below itself, so a medium gap is
                  enough before the content; the sections keep xlarge. */}
              <PageContent gap="medium">
                <PageHeader
                  title="Devices"
                  actions={
                    <Button
                      label="Export report"
                      icon={<Download />}
                      secondary
                    />
                  }
                />
                <Box gap="xlarge">
                  <EnergySummary />
                  <DevicesTable />
                </Box>
              </PageContent>
            </Page>
          </Main>
        </Grid>
      </AppContainer>
    </UserContext.Provider>
  );
};
