import React from 'react';
import { Box, FormField, TextArea } from 'grommet';

export const TextAreaExample = () => {
  return (
    <Box width="medium">
      <FormField label="Additional feedback" htmlFor="text-area-example">
        <TextArea
          id="text-area-example"
          placeholder="i.e. ideas, inspirations, or concerns"
          resize="vertical"
        />
      </FormField>
    </Box>
  );
};
