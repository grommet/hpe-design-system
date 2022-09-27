import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paragraph } from 'grommet';

export const Decision = ({ children, id, ...rest }) => (
  <Box {...rest}>
    <Box id={id} background="purple!" flex={false} pad="medium" round="large">
      <Paragraph margin="none" color="text-strong">
        {children}
      </Paragraph>
    </Box>
    <Box fill />
  </Box>
);

Decision.propTypes = {
  children: PropTypes.string,
};
