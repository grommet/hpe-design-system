import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Header, ResponsiveContext } from 'grommet';

const PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];

const StyledHeader = ({ background, pad, ...rest }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Header
      background={background}
      pad={
        pad || {
          vertical: 'medium',
          horizontal: size !== 'small' ? 'xlarge' : 'large',
        }
      }
      {...rest}
    />
  );
};

export { StyledHeader as Header };

StyledHeader.propTypes = {
  background: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string,
    }),
  ]),
  pad: PropTypes.oneOfType([
    PropTypes.oneOf(['none', ...PAD_SIZES]),
    PropTypes.shape({
      bottom: PropTypes.oneOfType([
        PropTypes.oneOf(PAD_SIZES),
        PropTypes.string,
      ]),
      horizontal: PropTypes.oneOfType([
        PropTypes.oneOf(PAD_SIZES),
        PropTypes.string,
      ]),
      left: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      right: PropTypes.oneOfType([
        PropTypes.oneOf(PAD_SIZES),
        PropTypes.string,
      ]),
      top: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      vertical: PropTypes.oneOfType([
        PropTypes.oneOf(PAD_SIZES),
        PropTypes.string,
      ]),
    }),
    PropTypes.string,
  ]),
};

StyledHeader.defaultProps = {
  background: undefined,
  pad: undefined,
};
