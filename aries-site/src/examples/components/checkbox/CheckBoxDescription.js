import React, { useState } from 'react';
import { Box, CheckBox, FormField } from 'grommet';

const items = ['Email', 'Phone', 'Text message'];

export const CheckBoxDescriptionExample = () => {
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
      <FormField
        htmlFor="checkbox-list" 
        label="Contact Info"
        help="Select all options that are relevant to you"
      >
        {items &&
          items.map(item => (
            <Box gap="small" pad="xsmall">
              <CheckBox
                key={item}
                label={item}
                checked={checked.includes(item)}
                onChange={event => onCheck(event, item)}
              />
            </Box>
          ))}
      </FormField>
    </Box>
  );
};
