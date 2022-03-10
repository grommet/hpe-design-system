import React from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Header,
  Heading,
  Text,
  TextInput,
} from 'grommet';

export const SingleFormFieldExample = () => {
  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };

  return (
    <Box
      pad="medium"
      round="small"
      elevation="medium"
      gap="medium"
      width="medium"
    >
      <Header
        direction="column"
        align="start"
        gap="xxsmall"
        pad={{ horizontal: 'xxsmall' }}
      >
        {/* Use semantically correct heading level and adjust size as 
        needed. In this instance, this example is presented within an 
        HTML section element and this is the first heading within the 
        section, therefor h2 is the semantically correct heading. For 
        additional detail, see https://design-system.hpe.design/foundation/typography#semantic-usage-of-heading-levels). */}
        <Heading size='small' level={2} margin="none">
          Delete
        </Heading>
        <Text>A subtitle if needed</Text>
      </Header>
      <Text>
        Are you sure you want to delete this Cluster? Doing so will erase all
        the data.
      </Text>
      <Box
        // Padding used to prevent focus from being cutoff
        pad={{ horizontal: 'xxsmall' }}
      >
        <Form
          validate="submit"
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
            <Button label="Delete Cluster" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};
