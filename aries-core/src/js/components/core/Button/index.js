import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from 'grommet';

const StyledButton = ({ label, ...rest }) => {
  return (
    <Button
      label={
        <Text color="text-strong" weight={500}>
          {label}
        </Text>
      }
      {...rest}
    />
  );
};

StyledButton.propTypes = {
  align: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

export { StyledButton as Button };
