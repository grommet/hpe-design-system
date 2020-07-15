import React from 'react';
import { Card } from 'grommet';

export const FormContainer = ({ ...rest }) => {
  return (
    <Card
      background="background-front"
      border
      pad={{ horizontal: 'medium', vertical: 'medium' }}
      {...rest}
    />
  );
};
