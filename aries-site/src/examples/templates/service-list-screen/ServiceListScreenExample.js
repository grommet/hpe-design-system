import React from 'react';
import PropTypes from 'prop-types';
import { AppIdentity } from 'aries-core';
import { Box, Button, Header, Heading, Menu } from 'grommet';
import { StyledList } from '.';
import { ScreenContainer, SidebarExample } from '..';

export const ServiceListScreenExample = ({ mobile }) => {
  return (
    <ScreenContainer mobile={mobile}>
      <Box
        direction={mobile ? 'column' : 'row'}
        width={mobile && { max: 'large' }}
        height={mobile && { max: 'xlarge' }}
        overflow="auto"
      >
        {!mobile && <SidebarExample />}
        <Box pad={{ horizontal: 'medium', bottom: 'medium' }} flex>
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
        </Box>
      </Box>
      {mobile && (
        <SidebarExample
          direction="row"
          fill="horizontal"
          mobile={mobile}
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        />
      )}
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

ServiceListScreenExample.propTypes = {
  mobile: PropTypes.bool,
};
