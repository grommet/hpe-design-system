import React from 'react';
import { Box, CheckBox, FormField } from 'grommet';

export const CheckBoxSimpleExample = () => {
  return (
    <Box align="center" pad="large">
      <FormField htmlFor="checkbox"  label="label">
        <CheckBox label="Choice" checked />
      </FormField>
    </Box>
  );
};
