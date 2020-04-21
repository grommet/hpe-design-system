import React, { useState } from 'react';
import { Box, CheckBox, FormField } from 'grommet';

export const CheckBoxSimpleExample = () => {
  const [checked, setChecked] = useState(true);
  return (
    <Box align="center" pad="large">
      <FormField htmlFor="simple-checkbox" label="Label">
        <CheckBox
          label="Choice"
          id="simple-checkbox"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
      </FormField>
    </Box>
  );
};
