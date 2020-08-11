import React from 'react';
import { Box, DateInput } from 'grommet';

export const DateInputSimpleExample = () => {
  const [value, setValue] = React.useState('');
  const onChange = event => {
    const nextValue = event.value;
    console.log('onChange', nextValue);
    setValue(nextValue);
  };
  return (
    <Box align="center" pad="large">
      <DateInput
        name="dateinput"
        id="dateinput"
        value={value}
        onChange={onChange}
        format="mm/dd/yyyy"
      />
    </Box>
  );
};
