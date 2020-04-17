import React from 'react';
import { Box, FormField, TextArea } from 'grommet';

export const TextAreaDisabledExample = () => {
  return (
    <Box width="medium">
      <FormField
        label="Additional feedback"
        htmlFor="text-area-disabled-example"
        disabled
      >
        <TextArea
          id="text-area-disabled-example"
          placeholder="Placeholder text"
          resize="vertical"
          disabled
        />
      </FormField>
    </Box>
  );
};
