import { forwardRef } from 'react';
import { Box } from 'grommet';

// Theme-like object specifying alignment, width, and spacing for
// an AppContainer.
const appContainer = {
  gap: 'large',
};

export const AppContainer = forwardRef(({ ...rest }, ref) => (
  <Box ref={ref} fill gap={appContainer.gap} {...rest} />
));
