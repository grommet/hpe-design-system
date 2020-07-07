import React from 'react';
import { Box, List, Menu, Text } from 'grommet';
import { More } from 'grommet-icons';

const data = [
  {
    name: 'Server 1',
    option: 'Active',
  },
  {
    name: 'Server 2',
    option: 'Inactive',
  },
  {
    name: 'Server 3',
    option: 'Active',
  },
  {
    name: 'Server 4',
    option: 'Active',
  },
  {
    name: 'Server 5',
    option: 'Inactive',
  },
];

export const ListNameOptionActionExample = () => {
  return (
    <Box width={{ max: 'xxlarge' }} margin="auto" fill>
      <List
        data={data}
        action={item => (
          <Box direction="row" align="center" gap="medium">
            <Box direction="row" gap="small" align="center">
              <Text>{item.option}</Text>
              <Box
                pad="xsmall"
                background={
                  item.option === 'Active' ? 'status-ok' : 'status-critical'
                }
                round
              />
            </Box>
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
          <Text weight="bold" key={index}>
            {datum.name}
          </Text>
        )}
      </List>
    </Box>
  );
};
