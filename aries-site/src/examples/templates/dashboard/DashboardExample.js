import React from 'react';
import PropTypes from 'prop-types';
import { AppIdentity } from 'aries-core';
import { Box, Button, Header, Heading, Menu } from 'grommet';
import { DashboardTiles } from '.';
import { ScreenContainer, SidebarExample } from '..';

export const DashboardExample = ({ mobile }) => {
  return (
    <ScreenContainer mobile={mobile}>
      <Box
        direction="row"
        fill
        width={mobile && { max: 'large' }}
        height={mobile && { max: 'xlarge' }}
        overflow="auto"
      >
        {!mobile && <SidebarExample mobile={mobile} />}
        <Box pad={{ horizontal: 'medium', bottom: 'medium' }} flex>
          <AppHeader />
          <PageHeader />
          <DashboardTiles mobile={mobile} />
        </Box>
      </Box>
      {mobile && (
        <SidebarExample
          mobile={mobile}
          direction="row"
          fill="horizontal"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        />
      )}
    </ScreenContainer>
  );
};

const AppHeader = () => (
  <Header pad={{ vertical: 'small' }}>
    <AppIdentity title="Server" brand="hpe" />
    <Box direction="row" gap="small">
      <Menu
        label="Master Control"
        items={[
          { label: 'Flynn ISO 01' },
          { label: 'TRON_SERV8r' },
          { label: 'HPE-Server-101' },
        ]}
      />
    </Box>
  </Header>
);

const PageHeader = () => (
  <Header>
    <Heading margin={{ vertical: 'medium' }} size="small">
      Controls
    </Heading>
    <Button label="Manage" primary />
  </Header>
);

DashboardExample.propTypes = {
  mobile: PropTypes.bool,
};
