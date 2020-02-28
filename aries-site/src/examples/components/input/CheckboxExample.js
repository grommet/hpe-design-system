import React, { useState } from 'react';
import { Box, CheckBox } from 'grommet';

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
  );
};
