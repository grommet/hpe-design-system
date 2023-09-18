import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

export const ContentSection = ({ pad, ...rest }) => (
  <Box
    as="section"
    pad={{
      bottom: 'medium',
      horizontal: 'xxsmall',
      top: 'large',
      ...pad,
    }}
    {...rest}
  />
);

ContentSection.propTypes = {
  pad: PropTypes.object,
};
