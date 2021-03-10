import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { CircleAlert } from 'grommet-icons';

export const Error = ({ children, ...rest }) => (
    <Box
      animation="fadeIn"
      background="validation-critical"
      margin={{ top: 'small' }}
      pad="small"
      round="4px"
    >
      <Box direction="row" gap="xsmall" {...rest}>
        <Box flex={false} margin={{ top: 'hair' }} pad={{ top: 'xxsmall' }}>
          <CircleAlert size="small" />
        </Box>
        <Text size="xsmall">{children}</Text>
      </Box>
    </Box>
  );

Error.propTypes = {
  children: PropTypes.string,
};
