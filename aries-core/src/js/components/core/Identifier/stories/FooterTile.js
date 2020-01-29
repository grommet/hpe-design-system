import React from 'react';
import { storiesOf } from '@storybook/react';

import { Tile, Tiles } from 'aries-core';
import {
  Location,
  System,
  ShieldSecurity,
  Tasks,
  User,
  Wifi,
} from 'grommet-icons';
import { Box, Footer, Grommet, Text } from 'grommet';

import { aries } from '../../../../../../../aries-site/src/themes/aries';
import { Identifier } from '../Identifier';

const data = [
  {
    color: 'blue',
    icon: <Wifi size="large" color="white" />,
    title: 'Remote Access',
    subTitle: 'Lights out Management (LOM)',
    message: 'Connected',
  },
  {
    color: 'green',
    icon: <System size="large" />,
    title: 'System',
    subTitle: 'Sub-system and Devices',
    message: 'Composable System',
  },
  {
    color: 'red',
    icon: <User size="large" />,
    title: 'User Sessions',
    subTitle: 'User Access on Server',
    message: '4 active sessions',
  },
  {
    color: 'purple',
    icon: <Tasks size="large" />,
    title: 'Logs',
    subTitle: 'Events, Integration, and Status',
    message: '204,353',
  },
  {
    color: 'orange',
    icon: <Location size="large" />,
    title: 'Beacons',
    subTitle: 'Uniqe identification light',
    message: '24 beacons connected',
  },
  {
    color: 'teal',
    icon: <ShieldSecurity size="large" />,
    title: 'Security',
    subTitle: 'Trusted Platform Module',
    message: 'No Module Connected',
  },
];

export const FooterTiles = () => (
  <Grommet theme={aries} full>
    <Box pad="xlarge" height="100%">
      <Tiles gap="large" rows="small" columns={['medium', 'medium', 'medium']}>
        {data.map(value => (
          <Tile
            background={value.color}
            key={`Tile ${value}`}
            onClick={() => {}}
            alignContent="center"
          >
            <Identifier
              pad={{ horizontal: 'medium', vertical: 'small' }}
              title={value.title}
              subTitle={value.subTitle}
              size="small"
              gap="medium"
              direction="column"
              align="left"
            >
              {value.icon}
            </Identifier>
            <Box flex />
            <Footer
              pad="small"
              background={{ color: `${value.color}!`, opacity: 'weak' }}
            >
              <Text size="xsmall">{value.message}</Text>
              {value.message === 'Connected' && (
                <Box round pad="xsmall" background="green" />
              )}
            </Footer>
          </Tile>
        ))}
      </Tiles>
    </Box>
  </Grommet>
);

storiesOf('Identifier', module).add('Footer Tiles', () => <FooterTiles />);
