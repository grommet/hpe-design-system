import React from 'react';
import { Box, Form, FormField, DateInput } from 'grommet';

export const DateInputReadOnlyExample = () => (
  <Box width="medium">
    <Form>
      <FormField name="readonly-example" label="Date" htmlFor="readonly-input">
        <DateInput
          name="readonly-example"
          id="readonly-input"
          format="mm/dd/yyyy"
          value="2020-03-14T09:00:00.000Z"
          readOnly
        />
      </FormField>
      <FormField
        name="readonlycopy-example"
        label="Date"
        htmlFor="readonlycopy-input"
      >
        <DateInput
          name="readonlycopy-example"
          id="readonlycopy-input"
          format="mm/dd/yyyy"
          value="2020-03-14T09:00:00.000Z"
          readOnlyCopy
        />
      </FormField>
    </Form>
  </Box>
);
