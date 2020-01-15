import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export const FormRow = ({ children, htmlFor, label }) => {
  return (
    <Box direction="row" align="center" gap="medium">
      <Box flex>
        <Text as="label" htmlFor={htmlFor} textAlign="end">
          {label}
        </Text>
      </Box>
      <Box width="small" flex={false}>
        {children}
      </Box>
    </Box>
  );
};

FormRow.propTypes = {
  children: PropTypes.element,
  htmlFor: PropTypes.string,
  label: PropTypes.string,
};
