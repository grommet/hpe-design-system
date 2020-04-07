import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paragraph } from 'grommet';

import { TEXT_SIZE } from '../../layouts';

export const SubsectionText = ({ level, size, ...rest }) => {
  return (
    <Box width="large">
      <Paragraph size={size || TEXT_SIZE[level]} fill margin="none" {...rest} />
    </Box>
  );
};

SubsectionText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element,
  ]),
  level: PropTypes.number,
  size: PropTypes.string,
};

SubsectionText.defaultProps = {
  level: 2,
  size: undefined,
};
