import {
  Box,
  Button,
  Card,
  CardBody,
  Footer,
  Heading,
  Paragraph,
} from 'grommet';

export const DoubleConfirmationExample = () => (
  <Card width="medium" elevation="large">
    <CardBody pad="medium" gap="medium">
      <Box gap="3xsmall">
        <Heading level={2} margin="none">
          Discard "Add application"?
        </Heading>
        <Paragraph margin="none">
          Are you sure you want to discard your changes?
        </Paragraph>
      </Box>
      <Footer direction="row" gap="xsmall" justify="end">
        <Button label="Cancel" />
        <Button label="Discard" primary />
      </Footer>
    </CardBody>
  </Card>
);
