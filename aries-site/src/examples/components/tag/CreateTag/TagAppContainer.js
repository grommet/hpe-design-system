import { Box } from 'grommet';

export function TagAppContainer({ ...rest }) {
  return <Box
    gap="large"
    fill
    margin="auto"
    overflow="auto"
    pad="medium"
    width={{ max: 'xxlarge' }}
    {...rest}
  />;
}
