import React, { useState } from 'react';
import { Box, Text } from 'grommet';
import { RangeInput } from 'aries-core';

import { UsageExample } from '../../../layouts';

export const RangeInputExample = () => {
  const [value, setValue] = useState(80);

  return (
    <UsageExample
      pad={{
        horizontal: 'large',
        vertical: 'large',
        small: { horizontal: 'large', vertical: 'xlarge' },
      }}
    >
      <Box gap="medium">
        <Box direction="row" gap="medium">
          <Text>Threshold</Text>
          <Text weight={700}>{value}%</Text>
        </Box>
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
      </Box>
    </UsageExample>
  );
};
