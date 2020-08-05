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
        <FormField
          name="simple-dateinput"
          htmlFor="simple-dateinput"
          label="Simple DateInput"
          required
        >
          <DateInput
            name="simple-dateinput"
            id="simple-dateinput"
            format="mm/dd/yyyy"
          />
        </FormField>
      </Form>
    </Box>
  );
};
