import React from 'react';
import { Tile } from 'aries-core';

export const FormContainer = ({ ...rest }) => {
  return (
    <Tile
      background="background-front"
      border
      pad={{ horizontal: 'medium', vertical: 'medium' }}
      {...rest}
    />
  );
};
