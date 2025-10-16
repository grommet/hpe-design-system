import React from 'react';
import { Box, List, Spinner, Text } from 'grommet';
import {
  Console,
  PersonalComputer,
  Desktop,
  User,
  System,
} from '@hpe-design/icons-grommet';
import { TextEmphasis } from 'aries-core';

const data = [
  {
    name: 'Eric Soderberg',
    option: 'Active',
    icon: <PersonalComputer />,
  },
  {
    name: 'Shimrit Yacobi',
    option: 'Inactive',
    icon: <User />,
  },
  {
    name: 'Chris Carlozzi',
    option: 'Active',
    icon: <Desktop />,
  },
  {
    name: 'Matthew Glissmann',
    option: 'Active',
    icon: <System />,
  },
  {
    name: 'Taylor Seamans',
    option: 'Inactive',
    icon: <Console />,
  },
];

export const ListSpinnerExample = () => (
  <Box pad="xsmall" gap="xsmall" width={{ max: '3xlarge' }} margin="auto" fill>
    <List
      data={data}
      action={item => <Text key={item.name}>{item.option}</Text>}
      onClickItem={e => {
        // eslint-disable-next-line no-alert
        alert(`You clicked on ${e.item.name}`);
      }}
    >
      {datum => (
        <Box key={datum.name} direction="row" gap="xsmall" align="center">
          {datum.icon}
          <TextEmphasis>{datum.name}</TextEmphasis>
        </Box>
      )}
    </List>
    <Spinner
      alignSelf="center"
      message={{
        start: 'Loading more data.',
        end: 'Data has been loaded.',
      }}
    />
  </Box>
);
