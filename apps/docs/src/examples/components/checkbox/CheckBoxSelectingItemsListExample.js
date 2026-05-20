import React, { useState } from 'react';
import { Box, Button, CheckBox, Text } from 'grommet';

const servers = [
  { id: 'web-01', name: 'web-server-01' },
  { id: 'db-02', name: 'db-server-02' },
  { id: 'cache-03', name: 'cache-server-03' },
];

export const CheckBoxSelectingItemsListExample = () => {
  const [selected, setSelected] = useState(['web-01']);
  const allSelected = selected.length === servers.length;
  const someSelected =
    selected.length > 0 &&
    selected.length < servers.length;

  const toggleAll = event => {
    if (event.target.checked) {
      setSelected(servers.map(s => s.id));
    } else {
      setSelected([]);
    }
  };

  const toggleOne = (id, checked) => {
    if (checked) {
      setSelected(prev => [...prev, id]);
    } else {
      setSelected(prev => prev.filter(i => i !== id));
    }
  };

  return (
    <Box width="medium" gap="small">
      {selected.length > 0 && (
        <Box
          direction="row"
          gap="small"
          pad="xsmall"
          background="background-contrast"
          round="xsmall"
          align="center"
        >
          <Text size="small">
            {selected.length} selected
          </Text>
          <Button label="Delete" size="small" />
          <Button label="Export" size="small" />
        </Box>
      )}
      <Box
        border={{ color: 'border', size: 'xsmall' }}
        round="xsmall"
      >
        <Box
          direction="row"
          align="center"
          pad={{ vertical: 'xsmall', horizontal: 'small' }}
          border={{
            side: 'bottom',
            color: 'border',
            size: 'xsmall',
          }}
        >
          <CheckBox
            id="select-all"
            name="select-all"
            label="Select all"
            checked={allSelected}
            indeterminate={someSelected}
            onChange={toggleAll}
          />
        </Box>
        {servers.map(server => (
          <Box
            key={server.id}
            direction="row"
            align="center"
            pad={{
              vertical: 'xsmall',
              horizontal: 'small',
            }}
            border={{
              side: 'bottom',
              color: 'border',
              size: 'xsmall',
            }}
          >
            <CheckBox
              id={server.id}
              name={server.id}
              label={server.name}
              checked={selected.includes(server.id)}
              onChange={event =>
                toggleOne(server.id, event.target.checked)
              }
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
