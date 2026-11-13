import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormField,
  TextInput,
  Button,
  Heading,
} from 'grommet';

<Card background="background-front" width="medium">
  <CardHeader>
    <Heading level={3} margin="none">
      Login
    </Heading>
  </CardHeader>
  <CardBody>
    <Form onSubmit={handleSubmit}>
      <FormField label="Email" name="email" required>
        <TextInput name="email" type="email" placeholder="user@example.com" />
      </FormField>
      <FormField label="Password" name="password" required>
        <TextInput name="password" type="password" />
      </FormField>
      <Button type="submit" label="Log In" primary fill="horizontal" />
    </Form>
  </CardBody>
</Card>;
