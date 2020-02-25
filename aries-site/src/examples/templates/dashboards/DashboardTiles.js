import React, { useContext } from 'react';
import { Identifier, Tiles, Tile } from 'aries-core';
import { Box, Footer, ResponsiveContext, Text } from 'grommet';
import {
  Wifi,
  System,
  User,
  Tasks,
  Location,
  ShieldSecurity,
} from 'grommet-icons';

const data = [
  {
    color: 'blue',
    icon: <Wifi />,
    title: 'Remote Access',
    subTitle: 'Lights out Management (LOM)',
    message: 'Connected',
  },
  {
    color: 'green',
    icon: <System />,
    title: 'System',
    subTitle: 'Sub-system and Devices',
    message: 'Composable System',
  },
  {
    color: 'red',
    icon: <User />,
    title: 'User Sessions',
    subTitle: 'User Access on Server',
    message: '4 active sessions',
  },
  {
    color: 'purple',
    icon: <Tasks />,
    title: 'Logs',
    subTitle: 'Events, Integration, and Status',
    message: '204,353',
  },
  {
    color: 'orange',
    icon: <Location />,
    title: 'Beacons',
    subTitle: 'Uniqe identification light',
    message: '24 beacons connected',
  },
  {
    color: 'teal',
    icon: <ShieldSecurity />,
    title: 'Security',
    subTitle: 'Trusted Platform Module',
    message: 'No Module Connected',
  },
];

export const DashboardTiles = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Tiles
      gap="medium"
      columns={size !== 'small' ? 'small' : 'auto'}
      margin={size === 'small' ? { bottom: 'xlarge' } : undefined}
    >
      {data.map(value => (
        <Tile
          background={value.color}
          key={`Tile ${value.title}`}
          alignContent="center"
          onClick={() => {}}
        >
          <Identifier
            pad={{ horizontal: 'medium', vertical: 'small' }}
            title={value.title}
            subTitle={value.subTitle}
            size="small"
            gap="medium"
            direction="column"
            align="start"
          >
            {value.icon}
          </Identifier>
          <Box flex />
          <Footer pad="small" background="background-contrast">
            <Text size="xsmall">{value.message}</Text>
            {value.message === 'Connected' && (
              <Box round pad="xsmall" background="green" />
            )}
          </Footer>
        </Tile>
      ))}
    </Tiles>
  );
};
