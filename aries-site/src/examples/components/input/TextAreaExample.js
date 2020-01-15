import React from 'react';
import { Box, FormField } from 'grommet';
import { TextArea } from 'aries-core';

import { UsageExample } from '../../../layouts';

export const TextAreaExample = () => {
  return (
    <UsageExample>
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
