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
  const [value, setValue] = React.useState('');
  const [message, setMessage] = React.useState(
    <Error background="background-front">Select date to resolve error</Error>,
  );
  const onChange = event => {
    const nextValue = event.value;
    if (!nextValue) {
      setMessage(
        <Error background="background-front">
          Select date to resolve error
        </Error>,
      );
    } else {
      setMessage('');
      setValue(nextValue);
    }
  };
  return (
    <Box align="center" pad="large">
      <Form>
        <FormField
          name="required-field"
          label="Required Field"
          htmlFor="required-field"
          error={message}
        >
          <DateInput
            onChange={onChange}
            name="required-field"
            id="required-field"
            format="mm/dd/yyyy"
            value={value}
          />
        </FormField>
      </Form>
    </Box>
  );
};
