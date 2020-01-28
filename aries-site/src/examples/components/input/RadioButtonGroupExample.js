import React, { useState } from 'react';
import { Box, RadioButtonGroup, Text } from 'grommet';

import { UsageExample } from '../../../layouts';

const powerRegulationOptions = [
  'Dynamic power savings mode',
  'Static low power mode',
  'Static high performance mode',
  'OS control mode',
];

export const RadioButtonGroupExample = () => {
  const [powerRegulation, setPowerRegulation] = useState(
    'Dynamic power savings mode',
  );

  return (
    <UsageExample
      pad={{
        horizontal: 'large',
        vertical: 'large',
        small: { horizontal: 'large', vertical: 'xlarge' },
      }}
    >
      <Box gap="xsmall">
        <Text size="large">Power Management</Text>
        <Text>Power Regulation</Text>
        <RadioButtonGroup
          name="power-regulation"
          options={powerRegulationOptions}
          value={powerRegulation}
          onChange={event => setPowerRegulation(event.target.value)}
          gap="medium"
          border={{ side: 'top', color: 'border' }}
          pad={{ vertical: 'medium' }}
        />
      </Box>
    </UsageExample>
  );
};
