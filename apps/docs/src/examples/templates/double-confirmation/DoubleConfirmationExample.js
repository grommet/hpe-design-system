import { Box, Button, Card, CardBody, Heading, Paragraph } from 'grommet';

export const DoubleConfirmationExample = () => (
  <Card alignSelf="center" round="medium" width="medium" elevation="large">
    <CardBody pad="medium" gap="medium">
      <Box gap="3xsmall">
        <Heading level={2} margin="none">
          Discard "Add application"?
        </Heading>
        <Paragraph margin="none">
          Are you sure you want to discard your changes?
        </Paragraph>
      </Box>
      <Box direction="row" gap="xsmall" justify="end" round="small">
        <Button label="Cancel" />
        <Button label="Discard" primary />
      </Box>
    </CardBody>
  </Card>
);
