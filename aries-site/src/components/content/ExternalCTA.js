import React from 'react';
import PropTypes from 'prop-types';
import { AnchorCallToAction } from 'aries-core';

const labels = {
  storybook: 'Storybook',
  figma: 'Use with Figma',
};

export const ExternalCTA = ({ label, type, ...rest }) => {
  const defaultLabel = labels[type];

  return (
    <AnchorCallToAction
      label={label || defaultLabel}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    />
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
