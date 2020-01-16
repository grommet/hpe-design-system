import React, { useState } from 'react';
import { Box, Stack, Text } from 'grommet';
import { RangeSelector } from 'aries-core';

import { UsageExample } from '../../../layouts';
import { getParentPage } from '../../../utils';

export const RangeSelectorExample = () => {
  const [values, setValues] = useState([50, 80]);

  return (
    <UsageExample
      pad={{
        horizontal: 'large',
        vertical: 'large',
        small: { horizontal: 'large', vertical: 'xlarge' },
      }}
    >
      <Box gap="medium" fill>
        <Box direction="row" gap="medium">
          <Text>Threshold</Text>
          <Text weight={700}>
            {values[0]}% - {values[1]}%
          </Text>
        </Box>
        <Stack anchor="center">
          <Box
            direction="row"
            background="background-contrast"
            height="4px"
            margin={{ left: 'medium', right: 'large' }}
          />
          <Box
            direction="row"
            gap="medium"
            justify="between"
            align="center"
            width="large"
            pad={{ horizontal: 'large' }}
          >
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
        </Stack>
      </Box>
    </UsageExample>
  );
};
