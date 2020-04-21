import React, { useState } from 'react';

import { Box, CheckBox, FormField } from 'grommet';

export const CheckBoxIndeterminateExample = () => {
  const [checked, setChecked] = useState([]);
  const checkboxes = ['morning', 'afternoon', 'evening'];

  const onCheckAll = event => {
    if (event.target.checked) {
      setChecked(checkboxes);
    } else {
      setChecked([]);
    }
  };

  const onCheck = (event, value) => {
    if (event.target.checked) {
      setChecked([...checked, value]);
    } else {
      setChecked(checked.filter(item => item !== value));
    }
  };

  return (
    <Box align="center" pad="large">
      <FormField htmlFor="indetminate-checkbox" label="Label">
        <Box pad="medium" gap="medium">
          <CheckBox
            id="indetminate-checkbox"
            checked={checked.length === 3}
            indeterminate={checked.length > 0 && checked.length < 3}
            label="All"
            onChange={onCheckAll}
          />
          {checkboxes.map(item => (
            <CheckBox
              id="checkbox-list"
              key={item}
              checked={checked.includes(item)}
              label={item}
              onChange={e => onCheck(e, item)}
            />
          ))}
        </Box>
      </FormField>
    </Box>
  );
};
