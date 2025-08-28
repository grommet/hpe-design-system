import { Box } from 'grommet';

export const ContentContainer = ({ ...rest }) => {
  return (
    <Box pad="medium" round="xlarge" background="background-front" {...rest} />
  );
};
