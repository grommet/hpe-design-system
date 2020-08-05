import React from 'react';
import { Box, Form, FormField, DateInput, Text } from 'grommet';
import PropTypes from 'prop-types';
import { CircleAlert } from 'grommet-icons';

const Error = ({ children, ...rest }) => {
  return (
    <Box direction="row" {...rest}>
      <Box flex={false} margin={{ top: 'xxsmall', right: 'xxsmall' }}>
        <CircleAlert size="small" />
      </Box>
      <Text size="xsmall">{children}</Text>
    </Box>
  );
};

Error.propTypes = {
  children: PropTypes.string,
};

export const DateInputValidationExample = () => {
  const [message, setMessage] = React.useState(
    <Error background="background-front">Select date to resolve error</Error>,
  );
  return (
    <Box align="center" pad="large">
      <Form onSubmit={({ value: nextValue }) => console.log(nextValue)}>
        <FormField
          name="required-field"
          label="Required Field"
          htmlFor="required-field"
          error={message}
        >
          <DateInput
            onChange={event => {
              if (event.value) {
                setMessage('');
              }
              if (!event.value) {
                setMessage('Select date to resolve error');
              }
            }}
            name="dateinput"
            id="required-field"
            format="mm/dd/yyyy"
          />
        </FormField>
      </Form>
    </Box>
  );
};
