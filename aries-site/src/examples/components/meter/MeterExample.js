import { TextEmphasis } from 'aries-core';
import { Box, Meter, Stack } from 'grommet';

export const MeterExample = () => {
  const meterValue = 30;

  return (
    <Box align="center" gap='xlarge'>
      <Stack anchor="center">
        <Meter
          type="circle"
          background="light-2"
          value={meterValue}
          size='xsmall'
        />
        <Box align="center" pad={{ bottom: '3xsmall' }}>
          <TextEmphasis size="3xl">{meterValue}%</TextEmphasis>
        </Box>
      </Stack>
    </Box>
  );
};
