import React, { useState } from 'react';
import { Box, FormField, RangeInput, Text } from 'grommet';

export const RangeInputDescriptionExample = () => {
  const [value, setValue] = useState(10);

  return (
    <FormField label="Label" help="RangeInput Description">
      <Box
        pad={{ horizontal: '11px', vertical: '5px' }}
        direction="row"
        gap="medium"
        width="large"
      >
        <Text weight={500}>0</Text>
        <RangeInput
          max={100}
          min={0}
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <Text weight={600}>100</Text>
      </Box>
    </FormField>
  );
};
