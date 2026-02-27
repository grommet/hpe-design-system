import { Box } from 'grommet';

export const LayerContainer = ({ ...rest }) => (
  <Box
    background="background-front"
    elevation="large"
    gap="medium"
    pad="medium"
    round="medium"
    {...rest}
  />
);
