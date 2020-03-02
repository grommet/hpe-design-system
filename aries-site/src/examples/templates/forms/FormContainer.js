import React from 'react';
import PropTypes from 'prop-types';
import { Tile } from 'aries-core';

export const FormContainer = ({ children, ...rest }) => {
  return (
    <Tile
      background="background-front"
      border
      pad={{ horizontal: 'medium', vertical: 'medium' }}
      {...rest}
    >
      {children}
    </Tile>
  );
};

FormContainer.propTypes = {
  children: PropTypes.node,
};
