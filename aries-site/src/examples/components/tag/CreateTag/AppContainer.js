import { Box } from 'grommet';

export const AppContainer = ({ ...rest }) => (
  <Box
    gap="large"
    fill
    margin="auto"
    overflow="auto"
    pad="medium"
    width={{ max: 'xxlarge' }}
    {...rest}
  />
);
