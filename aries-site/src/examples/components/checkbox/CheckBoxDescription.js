import React, { useState } from 'react';
import { Box, CheckBox, FormField } from 'grommet';

export const CheckBoxDescriptionExample = () => {
  const [checked, setChecked] = useState();

  return (
    <Box>
      <FormField
        htmlFor="checkbox-desc"
        label="Checkbox Heading"
        help="Checkbox Description"
      >
        <CheckBox
          id="checkbox-desc"
          label="Checkbox Label"
          checked={checked}
          onChange={event => setChecked(event.target.checked)}
        />
      </FormField>
    </Box>
  );
};
