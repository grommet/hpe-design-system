import React from 'react';
import { Box, Form, FormField, DateInput } from 'grommet';

const now = new Date();
const nextWeek = new Date(now);
nextWeek.setDate(nextWeek.getDate() + 7);

export const DateInputRangeExample = () => {
  const [value, setValue] = React.useState([
    '2020-07-31T15:27:42.920Z',
    '2020-08-07T15:27:42.920Z',
  ]);
  const onChange = event => {
    const nextValue = event.value;
    setValue(nextValue);
  };
  return (
    <Box align="center" pad="large">
      <Form onChange={onChange}>
        <FormField
          name="dateinput-range"
          htmlFor="dateinput-range"
          label="DateInput Range"
        >
          <DateInput
            value={value}
            name="dateinput-range"
            id="dateinput-range"
            format="mm/dd/yyyy-mm/dd/yyyy"
            onChange={onChange}
          />
        </FormField>
      </Form>
    </Box>
  );
};
