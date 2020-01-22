import React, { useState } from 'react';
import { Grommet, Box, TextInput } from 'grommet';
import { aries } from '../../../../../../../aries-site/src/themes/aries';

export default {
  title: 'TextInput',
};

export const Simple = () => {
  const [value, setValue] = useState('');
  const onChange = event => setValue(event.target.value);

  return (
    <Grommet theme={aries} full>
      <Box align="center" pad="large">
        <Box width="medium">
          <TextInput value={value} onChange={onChange} />
        </Box>
      </Box>
    </Grommet>
  );
};
