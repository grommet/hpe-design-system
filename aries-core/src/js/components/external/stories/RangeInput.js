import React from 'react';
import { Box, Grommet, RangeInput } from 'grommet';
import { aries } from '../../../../../../aries-site/src/themes/aries';

export default {
  title: 'RangeInput',
};

export const Simple = () => {
  const [value, setValue] = React.useState(5);
  const onChange = event => setValue(event.target.value);

  return (
    <Grommet theme={aries} full>
      <Box align="center" pad="large">
        <RangeInput value={value} onChange={onChange} />
      </Box>
    </Grommet>
  );
};
