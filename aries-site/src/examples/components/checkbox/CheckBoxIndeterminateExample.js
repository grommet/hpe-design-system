import React, { useState } from 'react';

import { Box, CheckBox, FormField } from 'grommet';

export const CheckBoxIndeterminateExample = () => {
  const [checked, setChecked] = useState([]);
  const checkboxes = ['morning', 'afternoon', 'evenging'];

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
    <Box align="center" gap="medium">
      <FormField label="label">
        <Box pad="xsmall">
          <CheckBox
            checked={checked.length === 3}
            indeterminate={checked.length > 0 && checked.length < 3}
            label="All"
            onChange={onCheckAll}
          />
        </Box>
        {checkboxes.map(item => (
          <Box gap="small" pad="xsmall">
            <CheckBox
              key={item}
              checked={checked.includes(item)}
              label={item}
              onChange={e => onCheck(e, item)}
            />
          </Box>
        ))}
      </FormField>
    </Box>
  );
};

{/* <Subsection name="Indeterminate" level={3}>
<SubsectionText>
  CheckBox Used to be able to check which every options apply to your
  user.
</SubsectionText>
<Example docs="" code="" height={{ min: 'small' }}>
  <CheckBoxIndeterminateExample />
</Example>
</Subsection> */}