import { forwardRef } from 'react';
import { Box } from 'grommet';

// Theme-like object specifying alignment, width, and spacing for
// an AppContainer.
export const appContainer = {
  gap: 'large',
};

// Debugging - remove forwardRef
export const AppContainer = forwardRef(({ ...rest }, ref) => (
  <Box ref={ref} fill="vertical" gap={appContainer.gap} {...rest} />
));
