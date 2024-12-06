import { Box } from 'grommet';

export const ScaleLayout = ({ ...rest }) => {
  return (
    <Box
      direction="row"
      align="end"
      alignSelf="start"
      gap="medium"
      wrap
      {...rest}
    />
  );
};
