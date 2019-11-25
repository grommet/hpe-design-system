import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, ThemeContext } from 'grommet';

export const AnchorUndecorated = ({ active, ...rest }) => {
  return (
    <ThemeContext.Extend
      value={{
        anchor: {
          textDecoration: active ? 'underline' : 'none',
        },
      }}
    >
      <Anchor {...rest} />
    </ThemeContext.Extend>
  );
};

AnchorUndecorated.propTypes = {
  active: PropTypes.bool,
};

AnchorUndecorated.defaultProps = {
  active: false,
};
