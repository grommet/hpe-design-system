import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { AnchorCallToAction } from 'aries-core';

const labels = {
  storybook: 'Storybook',
  figma: 'See in Figma',
};

export const ExternalCTA = ({ label, type, ...rest }) => {
  const defaultLabel = labels[type];

  return (
    // Align start ensures that the focusable/clickable area of anchor
    // is restricted to the label + icon so it doesn't span the width
    // of Subsection. Placing "align=start" on Subsection caused some
    // examples on other pages not to maintain their full width.
    <Box align="start">
      <AnchorCallToAction
        label={label || defaultLabel}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      />
    </Box>
  );
};

ExternalCTA.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['figma', 'storybook']),
};

ExternalCTA.defaultProps = {
  label: undefined,
  type: undefined,
};
