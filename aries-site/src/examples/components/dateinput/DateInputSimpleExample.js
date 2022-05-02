import React from 'react';
import { Box, DateInput } from 'grommet';

export function DateInputSimpleExample() {
  const [value, setValue] = React.useState('');
  const onChange = event => {
    const nextValue = event.value;
    setValue(nextValue);
  };
  return (
    <Box align="center" pad="large">
      <DateInput
        aria-label="dateinput"
        name="dateinput"
        id="dateinput"
        value={value}
        onChange={onChange}
        format="mm/dd/yyyy"
      />
    </Box>
  );
}
