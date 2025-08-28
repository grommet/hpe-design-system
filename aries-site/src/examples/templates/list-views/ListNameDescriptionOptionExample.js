import React from 'react';
import { Box, List, Text } from 'grommet';
import { TextEmphasis } from 'aries-core';

const data = [
  {
    name: 'Eric Soderberg',
    description: '10.68.229.0',
    option: 'Inactive',
  },
  {
    name: 'Alex Mejias',
    description: '10.33.221.9',
    option: 'Active',
  },
  {
    name: 'Vicky Avalos',
    description: '10.45.229.1',
    option: 'Inactive',
  },
  {
    name: 'Matthew Glissmann',
    description: '10.35.239.3',
    option: 'Active',
  },
  {
    name: 'Chris Carlozzi',
    description: '10.48.129.1',
    option: 'Active',
  },
];

export const ListNameDescriptionOptionExample = () => (
  <Box width={{ max: '3xlarge' }} margin="auto" fill>
    <List
      data={data}
      action={(item, index) => <Text key={index}>{item.option}</Text>}
    >
      {(datum, index) => (
        <Box key={index}>
          <TextEmphasis size="small">{datum.name}</TextEmphasis>
          <Text size="small">{datum.description}</Text>
        </Box>
      )}
    </List>
  </Box>
);
