import { Box, Heading } from 'grommet';

export const Help = ({...rest}) => {
  return (
    <Box pad="medium" {...rest}>
      <Heading level={3}>My help content</Heading>
    </Box>
  );
};
