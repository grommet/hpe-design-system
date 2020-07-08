import React from 'react';
import { Box, Grid, Image, Text } from 'grommet';

import { Card } from '../../../components/Card';

const data = [
  {
    displayName: 'Michael Walsh',
    alias: 'Mikey',
    emailAddress: 'michael.walsh@hpe.com',
    location: 'Astoria',
    deviceName: 'P1-K-24',
    ipAddress: '66.168.13.8',
    type: 'Access Point',
  },
  {
    displayName: 'Chester Copperpot',
    alias: undefined,
    emailAddress: 'chester.copperpot@hpe.com',
    location: 'Fort Collins',
    deviceName: 'P2-L-18',
    ipAddress: '66.168.13.4',
    type: 'Access Point',
  },
  {
    displayName: 'Mamma Fratelli',
    alias: undefined,
    emailAddress: 'mamma.fratelli@hpe.com',
    location: 'Fort Collins',
    deviceName: '6U-T-12',
    ipAddress: '192.168.15.100',
    type: 'Access Point',
  },
  {
    displayName: 'Brandon Walsh',
    alias: 'Brand',
    emailAddress: 'brandon.walsh@hpe.com',
    location: 'Fort Collins',
    deviceName: '6U-T-13',
    ipAddress: '192.168.15.101',
    type: 'Access Point',
  },
  {
    displayName: 'Andrea Carmichael',
    alias: 'Andy',
    emailAddress: 'andrea.carmichael@hpe.com',
    location: 'Fort Collins',
    deviceName: '6U-T-14',
    ipAddress: '192.168.15.105',
    type: 'Access Point',
  },
  {
    displayName: 'Richard Wang',
    alias: 'Data',
    emailAddress: 'richard.wang@hpe.com',
    location: 'Fort Collins',
    deviceName: '6L-RS-T3',
    ipAddress: '192.168.13.7',
    type: 'Server',
  },
  {
    displayName: 'Troy Perkins',
    alias: 'Troy',
    emailAddress: 'troy.perkins@hpe.com',
    location: 'Fort Collins',
    deviceName: '4L-D2-C3',
    ipAddress: '66.171.153.8',
    type: 'Router',
  },
  {
    displayName: 'Lawrence Cohen',
    alias: 'Chunk',
    emailAddress: 'lawrence.cohen@hpe.com',
    location: 'Fort Collins',
    deviceName: '4L-D2-C3',
    ipAddress: '192.168.1.1',
    type: 'Router',
  },
  {
    displayName: 'Clark Devereaux',
    alias: 'Mouth',
    emailAddress: 'clark.devereaux@hpe.com',
    location: 'Fort Collins',
    deviceName: '4L-S2-T57',
    ipAddress: '192.168.15.46',
    type: 'Switch',
  },
  {
    displayName: 'Stephanie Steinbrenner',
    alias: 'Stef',
    emailAddress: 'stephanie.steinbrenner@hpe.com',
    location: 'Fort Collins',
    deviceName: '4L-S2-D32',
    ipAddress: '192.168.15.24',
    type: 'Switch',
  },
];

export const CardsImageIdentifierExample = () => {
  return (
    <Box background="background-back" overflow="auto" pad="medium" fill>
      <Grid columns={{ count: 'fit', size: ['auto', 'medium'] }} gap="medium">
        {data &&
          data.map(({ displayName: title, location: subtitle }, index) => (
            <Card key={index} pad="small">
              <Box direction="row">
                <Box height="xsmall" width="xsmall" pad="small">
                  <Image src="/static/images/color-swirls.png" fit="cover" />
                </Box>
                <Box flex pad="small">
                  <Text color="text-strong" size="xxlarge" weight="bold">
                    {title}
                  </Text>
                  <Text>{subtitle}</Text>
                </Box>
              </Box>
            </Card>
          ))}
      </Grid>
    </Box>
  );
};
