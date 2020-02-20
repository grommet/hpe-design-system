import React from 'react';
import { AppIdentity } from 'aries-core';
import { Header, Box, Menu } from 'grommet';

export const AppHeaderExample = () => (
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
