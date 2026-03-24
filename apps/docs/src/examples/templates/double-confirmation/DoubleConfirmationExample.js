import {
  Box,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Heading,
  Paragraph,
} from 'grommet';

export const DoubleConfirmationExample = () => (
  <Card width="medium" elevation="large">
    <CardHeader>
      <Box gap="3xsmall">
        <Heading level={2} margin="none">
          Discard "Add application"?
        </Heading>
        <Paragraph margin="none">Your changes will not be applied.</Paragraph>
      </Box>
    </CardHeader>
    <CardFooter pad={{ top: 'none', bottom: 'medium', horizontal: 'medium' }}>
      <Box fill direction="row" gap="xsmall" justify="end">
        <Button label="Cancel" />
        <Button label="Discard" primary />
      </Box>
    </CardFooter>
  </Card>
);
