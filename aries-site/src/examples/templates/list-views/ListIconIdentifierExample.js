import React from 'react';
import { Box, List, Menu, Text } from 'grommet';
import {
  Console,
  More,
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
    <List
      data={data}
      action={item => (
        <Box direction="row" align="center" gap="medium">
          <Text>{item.option}</Text>
          <Menu
            icon={<More />}
            hoverIndicator
            items={[{ label: 'Deactivate' }, { label: 'Suspend' }]}
          />
        </Box>
      )}
      onClickItem={() => {}}
    >
      {(datum, index) => (
        <Box direction="row" gap="small" align="center" key={index}>
          {datum.icon}
          <Text weight="bold">{datum.name}</Text>
        </Box>
      )}
    </List>
  );
};
