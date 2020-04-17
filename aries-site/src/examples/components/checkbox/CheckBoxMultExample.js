import React, { useState } from 'react';
import { Box, CheckBox, Text } from 'grommet';

const items = ['C++', 'JavaScript', 'Python'];

export const CheckBoxMultExample = () => {
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
        <Text>Select prefered Language</Text>
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