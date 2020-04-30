import React from 'react';
import { Box, FormField, TextArea } from 'grommet';

export const TextAreaDisabledExample = () => {
  return (
    <Box width="medium">
      <Form>
        <FormField
          label="Additional feedback"
          htmlFor="text-area-disabled-example"
          name="disabled-example"
          disabled
        >
          <TextArea
            name="disabled-example"
            id="text-area-disabled-example"
            placeholder="Placeholder text"
            resize="vertical"
            disabled
          />
        </FormField>
      </Form>
    </Box>
  );
};
