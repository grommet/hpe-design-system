import { Box } from 'grommet';

// Theme-like object specifying alignment, width, and spacing for
// an AppContainer.
export const appContainer = {
  gap: 'large',
};

export const AppContainer = ({ ...rest }) => (
  <Box fill="vertical" gap={appContainer.gap} {...rest} />
);
