import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'grommet';

export function PreviewImageCard({ background, children, ...rest }) {
  return <Card
      background={background}
      elevation="none"
      height="small"
      round="xsmall"
      style={{ position: 'relative' }}
      {...rest}
    >
      {children}
    </Card>;
}

PreviewImageCard.defaultProps = {
  background: 'background-back',
};

PreviewImageCard.propTypes = {
  children: PropTypes.node,
  background: PropTypes.string,
};
