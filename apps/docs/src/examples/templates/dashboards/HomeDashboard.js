// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Grid,
  Main,
  Nav,
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
  Sidebar,
  Storage,
  VirtualStorage,
} from '@hpe-design/icons-grommet';
import { defaultUser, GlobalHeader, UserContext } from '../global-header';
import { AppContainer } from '../page-layouts/components';
import { DiscoverServices, ServiceHealth, WeekAtAGlance } from './content';
import { pageBackground, surfaceBackground } from './content/home/data';

const navigation = [
  { label: 'Workloads', icon: <Cube /> },
  { label: 'Console', icon: <Console /> },
  { label: 'Applications', icon: <Apps /> },
  { label: 'Cloud services', icon: <Cloud /> },
  { label: 'Storage', icon: <Storage /> },
  { label: 'Virtual storage', icon: <VirtualStorage /> },
  { label: 'Monitoring', icon: <Beacon /> },
];

const shell = {
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

export const HomeDashboard = () => {
  const size = useContext(ResponsiveContext);
  const [user, setUser] = useState(defaultUser);
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
          {showNav && <SideNav gridArea="nav" />}
          <Main gridArea="main">
            <Page pad={{ bottom: '3xlarge' }}>
              <PageContent gap="large">
                <PageHeader
                  title="Home"
                  actions={
                    <Button label="Customize" icon={<Configure />} secondary />
                  }
                />
                <ServiceHealth />
                <WeekAtAGlance />
                <DiscoverServices />
              </PageContent>
            </Page>
          </Main>
        </Grid>
      </AppContainer>
    </UserContext.Provider>
  );
};

// Collapsed, icon-only primary navigation rail.
const SideNav = ({ ...rest }) => (
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

SideNav.propTypes = {
  gridArea: PropTypes.string,
};
