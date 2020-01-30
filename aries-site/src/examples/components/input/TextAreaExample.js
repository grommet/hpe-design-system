import React from 'react';
import { Box, FormField, TextArea } from 'grommet';

import { UsageExample } from '../../../layouts';

export const TextAreaExample = () => {
  return (
    <UsageExample
      pad={{
        horizontal: 'large',
        vertical: 'large',
        small: { horizontal: 'large', vertical: 'xlarge' },
      }}
    >
      <Box width="medium">
        <FormField label="Additional feedback" htmlFor="text-area-example">
          <Box height="small">
            <TextArea
              id="text-area-example"
              placeholder="i.e. ideas, inspirations, or concerns"
              fill
            />
          </Box>
        </FormField>
      </Box>
    </UsageExample>
  );
};
