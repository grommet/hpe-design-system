import React from 'react';
import { Box } from 'grommet';

import { UsageExample } from '../../../../layouts';
import {
  MaskedDateExample,
  MaskedEmailExample,
  MaskedTimeExample,
  MaskedPhoneExample,
} from '.';

export const MaskedInputExample = () => {
  return (
    <UsageExample>
      <Box gap="medium">
        <Box direction="row-responsive" gap="large">
          <MaskedEmailExample />
          <MaskedDateExample />
          <MaskedTimeExample />
        </Box>
        <Box direction="row-responsive" gap="large">
          <MaskedPhoneExample />
        </Box>
      </Box>
    </UsageExample>
  );
};
