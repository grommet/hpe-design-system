import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, ThemeContext } from 'grommet';
import { css } from 'styled-components';

export const NavLink = ({ ...rest }) => {
  return (
    <ThemeContext.Extend
      value={{
        anchor: {
          extend: css`
            opacity: 70%;
            ${props => props.active && 'opacity: 100;'}
          `,
          hover: {
            extend: {
              opacity: '100%',
            },
            textDecoration: 'none',
          },
          fontWeight: 400,
        },
      }}
    >
      <Anchor {...rest} />
    </ThemeContext.Extend>
  );
};

NavLink.propTypes = {
  active: PropTypes.bool,
};
