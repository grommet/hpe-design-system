import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paragraph } from 'grommet';

export const Question = ({ children, ...rest }) => (
  <Box
    alignSelf="start"
    round="large"
    background="background-contrast"
    pad="medium"
    {...rest}
  >
    <Paragraph margin="none">{children}</Paragraph>
  </Box>
);

Question.propTypes = {
  children: PropTypes.string,
};
