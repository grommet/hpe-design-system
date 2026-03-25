import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Heading,
  Paragraph,
} from 'grommet';

export const DoubleConfirmationExample = () => (
  <Card gap="medium" pad="medium" width="medium" elevation="large">
    <CardHeader align="start" direction="column" gap="3xsmall" pad="none">
      <Heading level={2} margin="none">
        Discard "Add application"?
      </Heading>
      <Paragraph margin="none">Your changes will not be applied.</Paragraph>
    </CardHeader>
    <CardFooter pad="none" gap="xsmall" justify="end">
      <Button label="Cancel" />
      <Button label="Discard" primary />
    </CardFooter>
  </Card>
);
