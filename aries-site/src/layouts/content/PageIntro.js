import React from 'react';
import { Box, ResponsiveContext } from 'grommet';

export const PageIntro = ({ ...rest }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Box
      direction="row"
      justify="end"
      pad={size === 'small' ? { top: 'xlarge' } : undefined}
    >
      <Box
        width={size !== 'small' ? '50%' : '100%'}
        height={size !== 'small' ? { min: 'medium' } : undefined}
        pad={size !== 'small' ? 'large' : { top: 'xlarge' }}
        margin={size !== 'small' ? undefined : { top: 'xlarge' }}
        {...rest}
      />
    </Box>
  );
};
