import { Box, Meter, Stack, Text } from 'grommet';

export function MeterExample() {
  const meterValue = 30;

  return (
    <Box align="center" gap="large">
      <Stack anchor="center">
        <Meter
          type="circle"
          background="light-2"
          value={meterValue}
          size="small"
        />
        <Box align="center" pad={{ bottom: 'xsmall' }}>
          <Text size="3xl" weight="bold">
            {meterValue}%
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
