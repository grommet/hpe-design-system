import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { AnchorCallToAction } from 'aries-core';

export const StorybookAnchor = ({ href, label }) => {
  return (
    <Box align="start">
      <AnchorCallToAction
        href={href}
        label={label}
        target="_blank"
        rel="noopener noreferrer"
      />
    </Box>
  );
};

StorybookAnchor.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string,
};

StorybookAnchor.defaultProps = {
  label: 'See in Storybook',
};
