import React, { useState } from 'react';
import { Box, RangeInput, Text } from 'grommet';

export function RangeInputExample() {
  const [value, setValue] = useState(80);

  return (
    <Box direction="row" gap="medium" width="large">
      <Text weight={600}>0</Text>
      <RangeInput
        max={100}
        min={0}
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <Text weight={600}>100</Text>
    </Box>
  );
}
