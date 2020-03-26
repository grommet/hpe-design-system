import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paragraph } from 'grommet';

// Text size should be based on if its parent heading is an
// h2, h3, etc.
const TEXT_SIZE = {
  1: 'large', // heading is h1, parapgraph text should be large
  2: 'medium', // default font size
  3: 'small', // heading is h3, paragraph text should be small
};

export const SubsectionText = ({ level, size, ...rest }) => {
  return (
    <Box width="large">
      <Paragraph size={size || TEXT_SIZE[level]} fill margin="none" {...rest} />
    </Box>
  );
};

SubsectionText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  level: PropTypes.number,
  size: PropTypes.string,
};

SubsectionText.defaultProps = {
  level: 2,
  size: undefined,
};
