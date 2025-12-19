import React from 'react';
import { Box, CheckBoxGroup, Form, FormField } from 'grommet';

export const CheckBoxGroupScrollExample = () => (
  <Form>
    {/* https://github.com/grommet/eslint-plugin-grommet/issues/47 */}
    {/* eslint-disable-next-line grommet/formfield-htmlfor-id, 
    grommet/formfield-name */}
    <FormField name="scroll-checkbox" label="Label" htmlFor="scroll-checkbox">
      <Box width="medium" overflow="auto" height="xsmall">
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
