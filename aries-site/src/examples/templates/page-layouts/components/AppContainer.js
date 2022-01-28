import { Box } from 'grommet';

// Theme-like object specifying alignment, width, and spacing for
// an AppContainer.
export const appContainer = {
  gap: 'large',
};

export const AppContainer = ({ ...rest }) => (
  <Box gap={appContainer.gap} height={{ min: '100%' }} flex={false} {...rest} />
);
