import React, { useState } from 'react';
import { RangeSelector } from 'aries-core';
import { Box, Grommet, Stack, Text } from 'grommet';
import { aries } from '../../../../../../../aries-site/src/themes/aries';

export default {
  title: 'RangeSelector',
};

export const Simple = () => {
  const [values, setValues] = useState([50, 80]);

  return (
    <Grommet theme={aries} full>
      <Box align="center" pad="large">
        <Box gap="medium" fill>
          <Box direction="row" gap="medium">
            <Text>Threshold</Text>
            <Text weight={700}>
              {values[0]}% - {values[1]}%
            </Text>
          </Box>
          <Stack anchor="left">
            <Box
              direction="row"
              background="background-contrast"
              height="4px"
              width="large"
            />
            <Box
              direction="row"
              gap="medium"
              justify="between"
              align="center"
              width="large"
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
      </Box>
    </Grommet>
  );
};
