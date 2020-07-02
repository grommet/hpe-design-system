import React from 'react';
import { Box, Image, List, Menu, Text } from 'grommet';
import { More } from 'grommet-icons';

const data = [
  {
    name: 'User 1',
    description: 'San Jose, CA',
  },
  {
    name: 'User 2',
    description: 'Fort Collins, CO',
  },
  {
    name: 'User 3',
    description: 'San Jose, CA',
  },
  {
    name: 'User 4',
    description: 'Houston, TX',
  },
  {
    name: 'User 5',
    description: 'Houston, TX',
  },
];

export const ListImageIdentifierExample = () => {
  return (
    <List
      data={data}
      action={() => (
        <Menu
          icon={<More />}
          hoverIndicator
          items={[{ label: 'Deactivate' }, { label: 'Suspend' }]}
        />
      )}
    >
      {(datum, index) => (
        <Box direction="row" gap="small" key={index}>
          <Box width="xxsmall" height="xxsmall">
            <Image
              src="https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80"
              fit="cover"
            />
          </Box>
          <Box>
            <Text weight="bold" size="large">
              {datum.name}
            </Text>
            <Text size="small">Location: {datum.description}</Text>
          </Box>
        </Box>
      )}
    </List>
  );
};
