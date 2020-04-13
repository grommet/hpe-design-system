import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

export const PreviewImageCard = ({ background, children, ...rest }) => {
  return (
    <Box
      background={background}
      height="small"
      round="xsmall"
      overflow="hidden"
      style={{ position: 'relative' }}
      {...rest}
    >
      {children}
    </Box>
  );
};

PreviewImageCard.defaultProps = {
  background: 'background-back',
};

PreviewImageCard.propTypes = {
  children: PropTypes.node,
  background: PropTypes.string,
};
