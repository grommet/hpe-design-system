import { Box } from 'grommet';

export const ScaleLayout = ({ ...rest }) => {
  return (
    <Box
      direction="row"
      align="end"
      alignSelf="start"
      cssGap
      gap="medium"
      wrap
      {...rest}
    />
  );
};
