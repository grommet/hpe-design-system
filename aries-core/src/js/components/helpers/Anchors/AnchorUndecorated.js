import React from 'react';
import { Anchor, ThemeContext } from 'grommet';

export const AnchorUndecorated = ({ ...rest }) => {
  return (
    <ThemeContext.Extend
      value={{
        anchor: {
          textDecoration: 'none',
        },
      }}
    >
      <Anchor {...rest} />
    </ThemeContext.Extend>
  );
};
