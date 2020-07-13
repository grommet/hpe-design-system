import React from 'react';
import { Box, Image, List, Text } from 'grommet';

const data = [
  {
    name: 'User 1',
    description: 'San Jose, CA',
    image:
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80',
  },
  {
    name: 'User 2',
    description: 'Fort Collins, CO',
    image:
      'https://images.unsplash.com/photo-1503424886307-b090341d25d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80',
  },
  {
    name: 'User 3',
    description: 'San Jose, CA',
    image:
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2389&q=80',
  },
  {
    name: 'User 4',
    description: 'Houston, TX',
    image:
      'https://images.unsplash.com/photo-1456049616707-070399496327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80',
  },
  {
    name: 'User 5',
    description: 'Houston, TX',
    image:
      'https://images.unsplash.com/photo-1456049616707-070399496327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80',
  },
];

export const ListImageIdentifierExample = () => {
  return (
    <Box width={{ max: 'xxlarge' }} margin="auto" fill>
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
              <Image src={datum.image} fit="cover" />
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
    </Box>
  );
};
