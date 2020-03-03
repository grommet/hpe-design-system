import React from 'react';
import { Identifier } from 'aries-core';
import { Box, List, Menu, Text, ResponsiveContext } from 'grommet';
import { Monitor, More, User, System } from 'grommet-icons';

const data = [
  {
    user: 'lozzi@hpe.com',
    ip: '10.68.229.0',
    icon: color => <Monitor color={color} />,
    active: true,
  },
  {
    user: 'eric.soderberg@hpe.com',
    ip: '10.45.229.1',
    icon: color => <Monitor color={color} />,
    active: true,
  },
  {
    user: 'Guest',
    ip: '10.33.221.9',
    icon: color => <User color={color} />,
    active: false,
  },
  {
    user: 'Admin',
    ip: '10.45.229.1',
    icon: color => <System color={color} />,
    active: true,
  },
  {
    user: 'taylor.seamans@hpe.com',
    ip: '10.45.229.1',
    icon: color => <Monitor color={color} />,
    active: true,
  },
  {
    user: 'shimrit.yacobi@hpe.com',
    ip: '10.45.229.1',
    icon: color => <Monitor color={color} />,
    active: false,
  },
  {
    user: 'matthew.glissmann@hpe.com',
    ip: '10.45.229.1',
    icon: color => <Monitor color={color} />,
    active: false,
  },
];

export const StyledList = () => {
  const size = React.useContext(ResponsiveContext);

  return (
    <List
      data={data}
      pad="small"
      action={item => (
        <Box direction="row" align="center" gap="medium">
          {size !== 'small' && (
            <Text
              weight="bold"
              size="xsmall"
              color={!item.active && 'text-xweak'}
            >
              {item.active ? 'Active' : 'Inactive'}
            </Text>
          )}
          <Menu
            icon={<More />}
            hoverIndicator
            items={[{ label: 'Deactivate' }, { label: 'Suspend' }]}
          />
        </Box>
      )}
    >
      {(datum, index) => (
        <Box direction="row" align="center" justify="between">
          <Identifier
            title={datum.user}
            subTitle={datum.ip}
            gap="medium"
            size="small"
            key={index}
            direction="row"
          >
            <Box alignSelf="center">
              {datum.icon(!datum.active && 'text-xweak')}
            </Box>
          </Identifier>
        </Box>
      )}
    </List>
  );
};
