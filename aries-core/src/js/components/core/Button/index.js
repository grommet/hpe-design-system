import React from 'react';
import { Button } from 'grommet';

const StyledButton = ({ ...rest }) => {
  return <Button {...rest} />;
};

export { StyledButton as Button };
