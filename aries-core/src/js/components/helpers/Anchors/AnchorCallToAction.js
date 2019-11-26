import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, ThemeContext } from 'grommet';
import { FormNext } from 'grommet-icons';

export const AnchorCallToAction = ({ color, ...rest }) => {
  return (
    <ThemeContext.Extend
      value={{
        anchor: {
          extend: {
            'font-weight': '700',
          },
          textDecoration: 'none',
        },
      }}
    >
      <Anchor color={color} icon={<FormNext />} reverse {...rest} />
    </ThemeContext.Extend>
  );
};

AnchorCallToAction.defaultProps = {
  color: 'brand',
};

AnchorCallToAction.propTypes = {
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string,
    }),
  ]),
};
