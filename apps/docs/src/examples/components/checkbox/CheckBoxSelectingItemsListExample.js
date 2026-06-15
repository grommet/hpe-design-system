import React, { useState } from 'react';
import { Box, CheckBox, List } from 'grommet';

const servers = [
  { id: 'web-01', name: 'web-server-01' },
  { id: 'db-02', name: 'db-server-02' },
  { id: 'cache-03', name: 'cache-server-03' },
];

export const CheckBoxSelectingItemsListExample = () => {
  const [selected, setSelected] = useState(['web-01']);
  const allSelected = selected.length === servers.length;
  const someSelected = selected.length > 0 && selected.length < servers.length;

  const onCheckAll = event => {
    if (event.target.checked) {
      setSelected(servers.map(s => s.id));
    } else {
      setSelected([]);
    }
  };

  const onCheck = (id, checked) => {
    if (checked) {
      setSelected(prev => [...prev, id]);
    } else {
      setSelected(prev => prev.filter(i => i !== id));
    }
  };

  return (
    <Box
      width="medium"
      background="background-contrast"
      pad="xxsmall"
      round="xsmall"
    >
      <Box
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        border={{ side: 'bottom', color: 'border', size: 'xsmall' }}
      >
        <CheckBox
          id="select-all"
          name="select-all"
          label="Select all"
          checked={allSelected}
          indeterminate={someSelected}
          onChange={onCheckAll}
        />
      </Box>
      <List
        data={servers}
        itemKey="id"
        border={{ side: 'bottom', color: 'border', size: 'xsmall' }}
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        itemProps={{
          // Avoid double border where the final row meets the container edge.
          [servers.length - 1]: { border: undefined },
        }}
      >
        {({ id, name }) => (
          <CheckBox
            id={id}
            name={id}
            label={name}
            checked={selected.includes(id)}
            onChange={event => onCheck(id, event.target.checked)}
          />
        )}
      </List>
    </Box>
  );
};
