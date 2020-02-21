import React from 'react';
import { Identifier } from 'aries-core';
import { Box, List, Menu, Text } from 'grommet';
import { Monitor, More, User, System } from 'grommet-icons';

const data = [
  { user: 'lozzi@hpe.com', ip: '10.68.229.0', icon: <Monitor /> },
  { user: 'eric.soderberg@hpe.com', ip: '10.45.229.1', icon: <Monitor /> },
  {
    user: 'Guest',
    ip: '10.33.221.9',
    icon: <User />,
  },
  { user: 'Admin', ip: '10.45.229.1', icon: <System /> },
  { user: 'taylor.seamans@hpe.com', ip: '10.45.229.1', icon: <Monitor /> },
  { user: 'shimrit.yacobi@hpe.com', ip: '10.45.229.1', icon: <Monitor /> },
  { user: 'matthew.glissmann@hpe.com', ip: '10.45.229.1', icon: <Monitor /> },
];

export const StyledList = () => (
  <List
    data={data}
    pad="small"
    action={() => (
      <Box direction="row" align="center" gap="medium">
        <Text size="xsmall" weight="bold">
          Active
        </Text>
        <Menu
          icon={<More />}
          hoverIndicator
          items={[{ label: 'Deactivate' }, { label: 'Suspend' }]}
        />
      </Box>
    )}
  >
    {(datum, index) => (
      <Identifier
        title={datum.user}
        subTitle={datum.ip}
        gap="medium"
        size="small"
        key={index}
        direction="row"
      >
        <Box alignSelf="center">{datum.icon}</Box>
      </Identifier>
    )}
  </List>
);
