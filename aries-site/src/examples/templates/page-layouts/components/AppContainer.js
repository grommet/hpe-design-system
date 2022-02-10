import { Box } from 'grommet';

// Theme-like object specifying alignment, width, and spacing for
// an AppContainer.
export const appContainer = {
  gap: 'large',
  width: {
    min: 'medium',
  },
};

export const AppContainer = ({ ...rest }) => (
  <Box
    gap={appContainer.gap}
    height={{ min: '100%' }}
    width={appContainer.width}
    flex={false}
    {...rest}
  />
);
