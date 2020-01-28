import React, { useState } from 'react';
import { Box, CheckBox } from 'grommet';

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
    <UsageExample
      pad={{
        horizontal: 'large',
        vertical: 'large',
        small: { horizontal: 'large', vertical: 'xlarge' },
      }}
    >
      <Box gap="medium">
        {items &&
          items.map(item => (
            <CheckBox
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
