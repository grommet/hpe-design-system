import { Button, Box, Heading, Paragraph } from 'grommet';

export const DoubleConfirmationExample = () => (
  <Box
    gap="medium"
    pad="medium"
    width="medium"
    elevation="large"
    round="medium"
    background="background-floating"
  >
    <Box gap="3xsmall">
      <Heading level={2} margin="none">
        Discard "Add application"?
      </Heading>
      <Paragraph margin="none">Your changes will not be applied.</Paragraph>
    </Box>
    <Box direction="row" gap="xsmall" justify="end">
      <Button label="Cancel" />
      <Button label="Discard" primary />
    </Box>
  </Box>
);
