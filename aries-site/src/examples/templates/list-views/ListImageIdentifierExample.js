import React from 'react';
import { Box, Image, List, Text } from 'grommet';

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

export function ListImageIdentifierExample() {
  return <Box width={{ max: 'xxlarge' }} margin="auto" fill>
    <List
      background="background-front"
      data={data}
      onClickItem={e => {
        // eslint-disable-next-line no-alert
        alert(`You clicked on ${e.item.name}`);
      }}
    >
      {(datum, index) => (
        <Box direction="row" gap="small" key={index}>
          <Box width="xxsmall" height="xxsmall">
            <Image alt={datum.alt} src={datum.image} fit="cover" />
          </Box>
          <Box>
            <Text weight="bold" size="large">
              {datum.name}
            </Text>
            <Text size="small">{datum.description}</Text>
          </Box>
        </Box>
      )}
    </List>
  </Box>;
}
