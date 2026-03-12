import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Paragraph,
} from 'grommet';

export const DoubleConfirmationExample = () => (
  <Card width="medium" elevation="large">
    <CardBody>
      <Box gap="3xsmall">
        <Heading level={2} margin="none">
          Discard "Add application"?
        </Heading>
        <Paragraph margin="none">
          Are you sure you want to discard your changes?
        </Paragraph>
      </Box>
    </CardBody>
    <CardFooter pad={{ top: 'none', bottom: 'medium', horizontal: 'medium' }}>
      <Box fill direction="row" gap="xsmall" justify="end">
        <Button label="Cancel" />
        <Button label="Discard" primary />
      </Box>
    </CardFooter>
  </Card>
);
