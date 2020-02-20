import React from 'react';
import PropTypes from 'prop-types';
import { AppIdentity } from 'aries-core';
import { Box, Button, Header, Heading, Menu } from 'grommet';
import { DashboardTiles } from '.';
import { ScreenContainer } from '..';

export const DashboardExample = ({ mobile }) => {
  return (
    <ScreenContainer mobile={mobile}>
      <AppHeader />
      <PageHeader />
      <DashboardTiles mobile={mobile} />
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
