import React from 'react';
import { Box, CheckBox } from 'grommet';

export const CheckBoxStatesExample = () => (
  <Box direction="row-responsive" gap="xlarge" align="start">
    <Box width="small">
      <CheckBox
        label="Unchecked"
        checked={false}
        onChange={() => {}}
      />
    </Box>
    <Box width="small">
      <CheckBox
        label="Checked"
        checked
        onChange={() => {}}
      />
    </Box>
    <Box width="small">
      <CheckBox
        label="Indeterminate"
        checked={false}
        indeterminate
        onChange={() => {}}
      />
    </Box>
  </Box>
);
