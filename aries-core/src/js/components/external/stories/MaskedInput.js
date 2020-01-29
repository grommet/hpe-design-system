import React from 'react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { aries } from '../../../../../../aries-site/src/themes/aries';

export default {
  title: 'MaskedInput',
};

export const Email = () => {
  const [value, setValue] = React.useState('');
  return (
    <Grommet theme={aries} full>
      <Box pad="large" width="medium" margin="auto">
        <MaskedInput
          mask={[
            {
              regexp: /^[\w\-_.]+$/,
              placeholder: 'example',
            },
            { fixed: '@' },
            {
              regexp: /^[\w]+$/,
              placeholder: 'my',
            },
            { fixed: '.' },
            {
              regexp: /^[\w]+$/,
              placeholder: 'com',
            },
          ]}
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </Box>
    </Grommet>
  );
};
