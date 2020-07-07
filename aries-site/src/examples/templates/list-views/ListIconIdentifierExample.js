import React from 'react';
import { Box, List, Text } from 'grommet';
import {
  Console,
  PersonalComputer,
  Desktop,
  User,
  System,
} from 'grommet-icons';

const data = [
  {
    name: 'Title 1',
    option: 'Active',
    icon: <PersonalComputer />,
  },
  {
    name: 'Title 2',
    option: 'Inactive',
    icon: <User />,
  },
  {
    name: 'Title 3',
    option: 'Active',
    icon: <Desktop />,
  },
  {
    name: 'Title 4',
    option: 'Active',
    icon: <System />,
  },
  {
    name: 'Title 5',
    option: 'Inactive',
    icon: <Console />,
  },
];

export const ListIconIdentifierExample = () => {
  return (
    <Box width={{ max: 'xxlarge' }} margin="auto" fill>
      <List
        data={data}
        action={item => <Text>{item.option}</Text>}
        onClickItem={e => {
          // eslint-disable-next-line no-alert
          alert(`You clicked on ${e.item.name}`);
        }}
      >
        {(datum, index) => (
          <Box direction="row" gap="small" align="center" key={index}>
            {datum.icon}
            <Text weight="bold">{datum.name}</Text>
          </Box>
        )}
      </List>
    </Box>
  );
};
