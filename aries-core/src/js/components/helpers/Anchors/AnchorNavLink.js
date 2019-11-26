import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, ThemeContext } from 'grommet';
import { css } from 'styled-components';

export const AnchorNavLink = ({ ...rest }) => {
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
          textDecoration: 'none',
        },
      }}
    >
      <Anchor {...rest} />
    </ThemeContext.Extend>
  );
};

AnchorNavLink.propTypes = {
  active: PropTypes.bool,
};
