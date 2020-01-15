import React, { useState } from 'react';
import { Box, Text } from 'grommet';
import { RangeSelector } from 'aries-core';

import { UsageExample } from '../../../layouts';

export const RangeSelectorExample = () => {
  const [values, setValues] = useState([50, 80]);

  return (
    <UsageExample>
      <Box gap="medium">
        <Box direction="row" gap="medium">
          <Text>Threshold</Text>
          <Text weight={700}>
            {values[0]}% - {values[1]}%
          </Text>
        </Box>
        <Box direction="row" gap="medium" width="large" justify="between">
          <Text weight={600}>0</Text>
          <RangeSelector
            max={100}
            min={0}
            values={values}
            onChange={value => setValues(value)}
            fill
          />
          <Text weight={600}>100</Text>
        </Box>
      </Box>
    </UsageExample>
  );
};
