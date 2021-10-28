import React, { useContext } from 'react';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  FileInput,
  Header,
  Heading,
  Select,
  ResponsiveContext,
  Text,
  TextInput,
  TextArea,
} from 'grommet';
import { CircleAlert } from 'grommet-icons';

const superPower = ['Flying', 'Sky Runner', 'Invisibility'];
const weakness = ['Fire', 'PB & J', 'Kryptonite'];

export const RequiredFieldsExample = () => {
  const [formValues, setFormValues] = React.useState({
    name: 'Enduro',
    superPower: 'Sky Runner',
    nemesis: true,
    email: 'enduro@skyrunner.io.com',
    weakness: 'PB & J',
    comments: '',
  });
  const size = useContext(ResponsiveContext);
  // Set FormLevelError is set to true for display purposes
  // this should be set to false then api call will change state
  // eslint-disable-next-line no-unused-vars
  const [showFormLevelError, setShowFormLevelError] = React.useState(true);
  const onFormChange = value => {
    setFormValues(value);
  };
  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };

  return (
    <Box gap="medium" width="medium">
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
        <Heading level={2} margin="none">
          Form Heading
        </Heading>
      </Header>
      <Box
        // Padding used to prevent focus from being cutoff
        pad={{ horizontal: 'xxsmall' }}
      >
        <Form
          messages={{
            required: 'This is a required field.',
          }}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          value={formValues}
          onChange={onFormChange}
          method="post"
        >
          <FormField
            required
            error="Provide a unique name."
            htmlFor="name__input"
            name="name"
            label="Name"
          >
            <TextInput id="name" name="name" />
          </FormField>
          <FormField
            required
            htmlFor="superPower__input"
            name="superPower"
            label="Superpower"
          >
            <Select options={superPower} id="superPower" name="superPower" />
          </FormField>
          <FormField
            required
            htmlFor="weakness__input"
            name="weakness"
            label="Weakness"
          >
            <Select options={weakness} id="weakness" name="weakness" />
          </FormField>
          <FormField required htmlFor="email__input" name="email" label="Email">
            <TextInput id="email" name="email" />
          </FormField>
          <FormField
            help="Would you like to apply nemesis character?"
            htmlFor="nemesis__input"
            name="nemesis"
            label="Nemesis (optional)"
          >
            <CheckBox name="nemesis" label="Bring it on" toggle reverse />
          </FormField>
          <FormField
            htmlFor="comments"
            name="comments"
            label="Comments (optional)"
          >
            <TextArea id="comments" name="comments" placeholder="Comments" />
          </FormField>
          <FormField
            htmlFor="fileinput"
            name="fileinput"
            label="Upload a file"
            required
          >
            <FileInput
              messages={{
                dropPrompt: 'Drag and drop',
                browse: 'Select File',
              }}
              id="fileinput"
              name="fileinput"
            />
          </FormField>
          {/* Show error if api call came back as an error  */}
          {showFormLevelError && (
            <Box
              margin={{ top: 'medium', bottom: 'medium' }}
              round="4px"
              pad="small"
              background="validation-critical"
              direction="row"
              gap="xsmall"
            >
              <Box
                flex={false}
                margin={{ top: 'hair' }}
                pad={{ top: 'xxsmall' }}
              >
                <CircleAlert size="small" />
              </Box>
              <Text size="xsmall">
                The name of the superhero is already being used. Provide a
                unique name.
              </Text>
            </Box>
          )}
          <Box
            align={size !== 'small' ? 'start' : undefined}
            margin={{ top: 'medium', bottom: 'small' }}
          >
            <Button label="Create" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};
