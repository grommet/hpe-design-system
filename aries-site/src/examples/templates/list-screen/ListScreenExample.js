import React from 'react';
import PropTypes from 'prop-types';
import { AppIdentity } from 'aries-core';
import { Box, Button, Header, Heading, Menu } from 'grommet';
import { StyledList } from '.';
import { ScreenContainer } from '..';

export const ListScreenExample = ({ mobile }) => {
  return (
    <ScreenContainer mobile={mobile}>
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
      <PageHeader />
      <StyledList />
    </ScreenContainer>
  );
};

const PageHeader = () => (
  <Header>
    <Heading margin={{ vertical: 'medium' }} size="small">
      User Sessions
    </Heading>
    <Button label="Manage" primary />
  </Header>
);

ListScreenExample.propTypes = {
  mobile: PropTypes.bool,
};
