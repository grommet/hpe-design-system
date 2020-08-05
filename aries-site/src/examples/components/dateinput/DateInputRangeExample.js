import React from 'react';
import { Box, Form, FormField, DateInput } from 'grommet';

const now = new Date();
const nextWeek = new Date(now);
nextWeek.setDate(nextWeek.getDate() + 7);

const dateFormat = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
});

export const DateInputRangeExample = () => {
  const [value, setValue] = React.useState([
    nextWeek.toISOString(),
    now.toISOString(),
  ]);
  const onChange = event => {
    const nextValue = event.value;
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
        <FormField name="value" label="value" required>
          <DateInput
            value={value}
            format="mm/dd/yyyy-mm/dd/yyyy"
            buttonProps={{
              label: `${dateFormat.format(
                new Date(value[0]),
              )} - ${dateFormat.format(new Date(value[1]))}`,
            }}
            onChange={onChange}
          />
        </FormField>
      </Form>
    </Box>
  );
};
