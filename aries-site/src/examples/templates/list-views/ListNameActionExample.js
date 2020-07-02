import React from 'react';
import { List, Menu, Text } from 'grommet';
import { More } from 'grommet-icons';

const data = ['Server 1', 'Server 2', 'Server 3', 'Server 4', 'Server 5'];

export const ListNameActionExample = () => {
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
      onClickItem={() => {}}
    >
      {(datum, index) => (
        <Text weight="bold" key={index}>
          {datum}
        </Text>
      )}
    </List>
  );
};
