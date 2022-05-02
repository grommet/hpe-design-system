import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'grommet';

export function Subheading({ children, headingSize, level }) {
  return <Heading level={level} margin={{ vertical: 'none' }} size={headingSize}>
      {children}
    </Heading>;
}

Subheading.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.number,
  headingSize: PropTypes.string,
};

Subheading.defaultProps = {
  level: 2,
  headingSize: undefined,
};
