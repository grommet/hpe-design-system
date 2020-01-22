import React from 'react';
import { Box, Grommet, RadioButtonGroup } from 'grommet';
import { aries } from '../../../../../../../aries-site/src/themes/aries';

export default {
  title: 'RadioButtonGroup',
};

export const Simple = () => {
  const [value, setValue] = React.useState('');
  return (
    <Grommet theme={aries} full>
      <Box align="center" pad="large">
        <RadioButtonGroup
          name="radio"
          options={[
            { label: 'Choice 1', value: 'c1' },
            { label: 'Choice 2', value: 'c2' },
            { label: 'Choice 3', value: 'c3' },
          ]}
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </Box>
    </Grommet>
  );
};
