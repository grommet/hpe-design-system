import { useState } from 'react';
import { Box, RangeSelector, Stack, Text } from 'grommet';

export const RangeSelectorExample = () => {
  const [range, setRange] = useState([4, 7]);
  const onChange = values => {
    setRange(values);
  };

  return (
    <Box align="center" pad='xlarge'>
      <Stack>
        <Box direction="row" justify="between">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(value => (
            <Box
              key={value}
              width='5xsmall'
              height='5xsmall'
              align="center"
              pad='xsmall'
              border={false}
            >
              <Text style={{ fontFamily: 'monospace' }}>{value}</Text>
            </Box>
          ))}
        </Box>
        <RangeSelector
          min={1}
          max={11}
          size="full"
          values={range}
          onChange={onChange}
        />
      </Stack>
    </Box>
  );
};
