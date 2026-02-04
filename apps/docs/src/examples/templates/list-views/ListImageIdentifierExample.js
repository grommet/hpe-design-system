import React from 'react';
import { Box, Image, List, Text } from 'grommet';
import { TextEmphasis } from '@shared/aries-core';

const data = [
  {
    name: 'Eric Soderberg',
    description: 'San Jose, CA',
    alt: `View of the Golden Gate Bridge with San Francisco in the 
    background on a sunny day with partial clouds.`,
    image:
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80',
  },
  {
    name: 'Shimi Yacobi',
    description: 'Fort Collins, CO',
    alt: `Valley of green grass and trees with yellow leaves surrounded by tall 
    mountains with snowy peaks.`,
    image:
      'https://images.unsplash.com/photo-1503424886307-b090341d25d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80',
  },
  {
    name: 'Chris Carlozzi',
    description: 'San Jose, CA',
    alt: `View of the Golden Gate Bridge with San Francisco in the 
    background on a sunny day with partial clouds.`,
    image:
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80',
  },
  {
    name: 'Taylor Seamans',
    description: 'San Jose, CA',
    alt: `View of the Golden Gate Bridge with San Francisco in the 
    background on a sunny day with partial clouds.`,
    image:
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80',
  },
  {
    name: 'Brittany Archibeque',
    description: 'Fort Collins, CO',
    alt: `Valley of green grass and trees with yellow leaves surrounded by tall 
    mountains with snowy peaks.`,
    image:
      'https://images.unsplash.com/photo-1503424886307-b090341d25d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80',
  },
];

export const ListImageIdentifierExample = () => (
  <Box width={{ max: '3xlarge' }} margin="auto" fill>
    <List
      // eslint-disable-next-line max-len
      aria-label="Locations of people and image showing the locations where people are currently situated"
      data={data}
      onClickItem={e => {
        // eslint-disable-next-line no-alert
        alert(`You clicked on ${e.item.name}`);
      }}
    >
      {(datum, index) => (
        <Box direction="row" gap="xsmall" key={index}>
          <Box width="5xsmall" height="5xsmall">
            <Image alt={datum.alt} src={datum.image} fit="cover" />
          </Box>
          <Box>
            <TextEmphasis size="large">{datum.name}</TextEmphasis>
            <Text size="small">{datum.description}</Text>
          </Box>
        </Box>
      )}
    </List>
  </Box>
);
