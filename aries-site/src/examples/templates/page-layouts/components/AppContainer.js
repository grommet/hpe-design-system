import { Box } from 'grommet';

// Theme-like object specifying alignment, width, and spacing for
// an AppContainer.
const appContainer = {
  gap: 'large',
};

export const AppContainer = ({ ...rest }) => (
  <Box fill gap={appContainer.gap} {...rest} />
);
