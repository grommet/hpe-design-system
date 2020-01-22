import React, { useState } from 'react';
import { CheckBox, Box, Grommet } from 'grommet';
import { aries } from '../../../../../../../aries-site/src/themes/aries';

export default {
  title: 'CheckBox',
};

export const Simple = () => {
  const [checked, setChecked] = useState(false);
  const onChange = event => setChecked(event.target.checked);
  return (
    <Grommet theme={aries} full>
      <Box align="center" pad="large">
        <CheckBox checked={checked} onChange={onChange} label="Choice" />
      </Box>
    </Grommet>
  );
};
