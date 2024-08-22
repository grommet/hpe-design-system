import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'grommet';

export const PreviewImageCard = ({
  background = 'background-back',
  children,
  ...rest
}) => (
  <Card
    background={background}
    elevation="none"
    height="small"
    round="xsmall"
    style={{ position: 'relative' }}
    {...rest}
  >
    {children}
  </Card>
);

PreviewImageCard.propTypes = {
  children: PropTypes.node,
  background: PropTypes.string,
};
