import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Form,
  FormField,
  Header,
  Heading,
  Text,
  TextInput,
} from 'grommet';

export const SingleFormFieldExample = () => {
  const [cancel, setCancel] = React.useState('');
  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };

  const confirmDelete = () => {
    const doesMatch = cancel.delete === 'DELETE';
    return doesMatch
      ? undefined
      : { message: 'Text does not match "DELETE"', status: 'error' };
  };

  return (
    <Card width="medium">
      <CardBody gap="medium">
        <Header
          direction="column"
          align="start"
          gap="xxsmall"
          pad={{ horizontal: 'xxsmall' }}
        >
          <Heading level={2} margin="none">
            Delete Cluster
          </Heading>
        </Header>
        <Text>
          Are you sure you want to delete this cluster? Doing so will erase all
          the data.
        </Text>
        <Box
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form
            validate="blur"
            onChange={setCancel}
            messages={{
              required: 'This is a required field.',
            }}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          >
            <FormField
              label="Type DELETE to verify"
              name="delete"
              htmlFor="delete"
              required
              validate={confirmDelete}
            >
              <TextInput id="delete" name="delete" placeholder="DELETE" />
            </FormField>
            <Box
              justify="end"
              gap="medium"
              margin={{ top: 'medium', bottom: 'small' }}
              direction="row"
            >
              <Button label="Cancel" />
              <Button label="Delete cluster" primary type="submit" />
            </Box>
          </Form>
        </Box>
      </CardBody>
    </Card>
  );
};
