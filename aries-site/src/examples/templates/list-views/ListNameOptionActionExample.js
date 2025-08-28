import React from 'react';
import { Box, List, Menu, Text } from 'grommet';
import { More, StatusGoodSmall, StatusCriticalSmall } from 'grommet-icons';
import { TextEmphasis } from 'aries-core';

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
  <Box width={{ max: '3xlarge' }} margin="auto" fill>
    <List
      data={data}
      action={(item, index) => (
        <Box key={index} direction="row" align="center" gap="medium">
          <Box direction="row" gap='xsmall' align="center">
            <Text>{item.option}</Text>
            <item.icon color={item.color} size="small" />
          </Box>
          <Menu
            icon={<More />}
            hoverIndicator
            items={[{ label: 'Manage order' }, { label: 'Cancel order' }]}
          />
        </Box>
      )}
    >
      {(datum, index) => <TextEmphasis key={index}>{datum.name}</TextEmphasis>}
    </List>
  </Box>
);
