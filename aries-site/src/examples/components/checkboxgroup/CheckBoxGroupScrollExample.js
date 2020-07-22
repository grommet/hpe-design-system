import React from 'react';
import { Box, CheckBoxGroup, Form, FormField } from 'grommet';

export const CheckBoxGroupScrollExample = () => {
  return (
    <Form>
      <FormField name="scroll-checkbox" label="Label" htmlFor="scroll-checkbox">
        <Box width="medium" overflow="scroll" height="small">
          <CheckBoxGroup
            name="scroll-checkbox"
            id="scroll-checkbox"
            options={[
              'Option 1',
              'Option 2',
              'Option 3',
              'Option4',
              'Option5',
              'Option6',
              'Option7',
            ]}
          />
        </Box>
      </FormField>
    </Form>
  );
};
