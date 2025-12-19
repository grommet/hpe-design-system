import React from 'react';
import { Box, Chart } from 'grommet';

const values = [{ value: [0, 20] }, { value: [10, 30] }, { value: [20, 15] }];

export const ChartExample = () => (
  <Box direction="row-responsive" gap="xlarge" wrap>
    {['bar', 'line', 'area', 'point'].map(type => (
      <Box align="center" gap="medium" margin={{ bottom: 'medium' }}>
        <Chart key={type} type={type} values={values} size="xsmall" />
      </Box>
    ))}
  </Box>
);
