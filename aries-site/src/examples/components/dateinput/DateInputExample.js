import React from 'react';
import { Box, Form, FormField, DateInput } from 'grommet';

export const DateInputExample = () => {
  const [value, setValue] = React.useState({ value: '' });
  const onChange = nextValue => {
    console.log('onChange', nextValue);
    setValue(nextValue);
  };
  return (
    <Box align="center" pad="large">
      <Form
        value={value}
        onChange={onChange}
        onSubmit={({ value: nextValue }) => console.log(nextValue)}
      >
        <FormField name="value" label="label" required>
          <DateInput name="value" format="mm/dd/yyyy" />
        </FormField>
      </Form>
    </Box>
  );
};
