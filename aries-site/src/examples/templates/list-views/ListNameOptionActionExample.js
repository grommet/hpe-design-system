import React from 'react';
import { Box, List, Menu, Text } from 'grommet';
import { More } from 'grommet-icons';

const data = [
  {
    name: 'My PVT Cloud Order',
    option: 'Complete',
  },
  {
    name: 'VMaaS for R&D',
    option: 'Critical',
  },
  {
    name: 'GEM_1',
    option: 'Complete',
  },
  {
    name: 'Mercury',
    option: 'Complete',
  },
  {
    name: 'MCC',
    option: 'Critical',
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
              <Box
                pad="xsmall"
                background={
                  item.option === 'Complete' ? 'status-ok' : 'status-critical'
                }
                round
              />
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
