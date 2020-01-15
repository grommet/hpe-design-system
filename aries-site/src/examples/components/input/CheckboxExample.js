import React, { useState } from 'react';
import { Box } from 'grommet';
import { Checkbox } from 'aries-core';

import { UsageExample } from '../../../layouts';

const items = ['C++', 'JavaScript', 'Python'];

export const CheckboxExample = () => {
  const [checked, setChecked] = useState(['JavaScript']);

  const onCheck = (event, item) => {
    if (event.target.checked) {
      setChecked([...checked, item]);
    } else {
      setChecked(checked.filter(el => el !== item));
    }
  };

  return (
    <UsageExample>
      <Box gap="medium">
        {items &&
          items.map(item => (
            <Checkbox
              key={item}
              label={item}
              checked={checked.includes(item)}
              onChange={event => onCheck(event, item)}
            />
          ))}
      </Box>
    </UsageExample>
  );
};
