import React, { useState } from 'react';
import { Box, CheckBox, FormField } from 'grommet';

export const CheckBoxSimpleExample = () => {
  const [checked, setChecked] = useState(true);
  return (
    <Box width="medium" align="center">
      <FormField fill htmlFor="simple-checkbox" label="Label">
        <CheckBox
          label="Choice"
          id="simple-checkbox"
          checked={checked}
          onChange={event => setChecked(event.target.checked)}
        />
      </FormField>
    </Box>
  );
};
