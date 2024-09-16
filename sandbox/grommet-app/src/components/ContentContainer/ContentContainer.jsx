import { Box } from 'grommet';

export const ContentContainer = ({ ...rest }) => {
  return (
    <Box pad="medium" round="medium" background="background-front" {...rest} />
  );
};
