import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { AnchorCallToAction } from 'aries-core';

export const FigmaAnchor = ({ href }) => {
  return (
    <Box align="start">
      <AnchorCallToAction
        href={href}
        label="Use with Figma"
        target="_blank"
        rel="noopener noreferrer"
      />
    </Box>
  );
};

FigmaAnchor.propTypes = {
  href: PropTypes.string.isRequired,
};
