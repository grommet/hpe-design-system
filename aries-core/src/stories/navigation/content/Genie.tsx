import { Box, Heading } from 'grommet';

export const Genie = ({ ...rest }) => {
  return (
    <Box pad="medium" {...rest}>
      <Heading level={3}>My genie content</Heading>
    </Box>
  );
};
