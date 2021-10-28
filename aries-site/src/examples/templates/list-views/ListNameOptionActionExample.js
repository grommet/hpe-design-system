import React from 'react';
import { Box, List, Menu, Text } from 'grommet';
import { More, StatusGoodSmall, StatusCriticalSmall } from 'grommet-icons';

const data = [
  {
    name: 'My PVT Cloud Order',
    option: 'Complete',
    icon: StatusGoodSmall,
    color: 'status-ok',
  },
  {
    name: 'VMaaS for R&D',
    option: 'Critical',
    icon: StatusCriticalSmall,
    color: 'status-critical',
  },
  {
    name: 'GEM_1',
    option: 'Complete',
    icon: StatusGoodSmall,
    color: 'status-ok',
  },
  {
    name: 'Mercury',
    option: 'Complete',
    icon: StatusGoodSmall,
    color: 'status-ok',
  },
  {
    name: 'MCC',
    option: 'Critical',
    icon: StatusCriticalSmall,
    color: 'status-critical',
  },
];

export const ListNameOptionActionExample = () => (
  <Box width={{ max: 'xxlarge' }} margin="auto" fill>
    <List
      background="background-front"
      data={data}
      action={item => (
        <Box direction="row" align="center" gap="medium">
          <Box direction="row" gap="small" align="center">
            <Text>{item.option}</Text>
            <item.icon color={item.color} size="small" />
          </Box>
          <Menu
            icon={<More />}
            hoverIndicator
            items={[{ label: 'Manage Order' }, { label: 'Cancel Order' }]}
          />
        </Box>
      )}
    >
      {(datum, index) => (
        <Text weight="bold" key={index}>
          {datum.name}
        </Text>
      )}
    </List>
  </Box>
);
