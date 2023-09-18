import { Box } from 'grommet';

export const TagAppContainer = ({ ...rest }) => (
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
