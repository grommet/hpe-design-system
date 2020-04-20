import React, { useState } from 'react';
import { Box, CheckBox, FormField } from 'grommet';

export const CheckBoxSimpleExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Box align="center" pad="large">
      <FormField htmlFor="checkbox" label="Label">
        <CheckBox
        id="checkbox"
          label="Choice"
          checked={checked}
          onChange={event => setChecked(event.target.checked)}
        />
      </FormField>
    </Box>
  );
};
