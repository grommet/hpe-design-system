import React, { useContext, useState } from 'react';
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
import { Alert } from '@hpe-design/icons-grommet';
import { ContentPane } from '../../../layouts/content/ContentPane';

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

  const [numFiles, setNumFiles] = useState(0);

  return (
    <ContentPane gap="medium" width="medium">
      <Header
        direction="column"
        align="start"
        gap="5xsmall"
        pad={{ horizontal: '5xsmall' }}
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
        pad={{ horizontal: '5xsmall' }}
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
            htmlFor="name"
            name="name"
            label="Name"
          >
            <TextInput id="name" name="name" />
          </FormField>
          {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
          {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
          <FormField
            required
            htmlFor="superPower__input"
            name="superPower"
            label="Superpower"
          >
            <Select options={superPower} id="superPower" name="superPower" />
          </FormField>
          {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
          {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
          <FormField
            required
            htmlFor="weakness__input"
            name="weakness"
            label="Weakness"
          >
            <Select options={weakness} id="weakness" name="weakness" />
          </FormField>
          <FormField required htmlFor="email" name="email" label="Email">
            <TextInput id="email" name="email" />
          </FormField>
          <FormField
            help="Would you like to apply nemesis character?"
            htmlFor="nemesis"
            name="nemesis"
            label="Nemesis"
          >
            <CheckBox
              id="nemesis"
              name="nemesis"
              label="Bring it on"
              toggle
              reverse
            />
          </FormField>
          <FormField htmlFor="comments" name="comments" label="Comments">
            <TextArea
              id="comments"
              name="comments"
              placeholder="Comments"
              resize="vertical"
            />
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
                browse: numFiles > 0 ? 'Replace file' : 'Select file',
              }}
              id="fileinput"
              onChange={(event, { files }) => setNumFiles(files.length)}
              name="fileinput"
            />
          </FormField>
          {/* Show error if api call came back as an error  */}
          {showFormLevelError && (
            <Box
              margin={{ top: 'medium', bottom: 'medium' }}
              round="4px"
              pad="xsmall"
              background="validation-critical"
              direction="row"
              gap="3xsmall"
            >
              <Alert size="small" />
              <Text size="xsmall">
                The name of the superhero is already being used. Provide a
                unique name.
              </Text>
            </Box>
          )}
          <Box
            align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
            margin={{ top: 'medium', bottom: 'xsmall' }}
          >
            <Button label="Create" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </ContentPane>
  );
};
