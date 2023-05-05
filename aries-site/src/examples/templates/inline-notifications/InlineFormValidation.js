import React from 'react';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Heading,
  Notification,
  TextInput,
} from 'grommet';

export const FormValidation = () => {
  return (
    <Box gap="medium" width="medium">
      <Heading level={2} margin="none">
        Create cluster
      </Heading>
      <Form>
        <FormField label="Name" name="name" htmlFor="name" required>
          <TextInput name="name" id="name" value="Cluster 1" />
        </FormField>
        <FormField
          htmlFor="resource-manager"
          name="resource-manager"
          label="Distributed resource manager"
        >
          <CheckBox
            id="resource-manager"
            name="resource-manager"
            label="Use manager"
          />
        </FormField>
        <Box gap="medium" pad={{ top: 'medium' }}>
          <Notification
            status="critical"
            message={`The name of your cluster is already being used. 
              Please provide a different name.`}
          />
          <Button
            alignSelf="start"
            label="Create cluster"
            type="submit"
            primary
          />
        </Box>
      </Form>
    </Box>
  );
};
