import React from 'react';
import {
  Box,
  Button,
  FileInput,
  Form,
  FormField,
  Header,
  Heading,
  RadioButtonGroup,
  Select,
  Text,
  TextArea,
  TextInput,
} from 'grommet';
import { Close } from 'grommet-icons';

const Category = ['Movie', 'Show', 'Cartoon',];

export const FileInputSingleExample = () => {
  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
    setOpen(false);
  };

  return (
    <Box width="medium" gap="medium">
      <Box>
        <Header align="start" pad={{ horizontal: 'xxsmall' }}>
          <Box gap="xxsmall">
            <Heading level={3} margin="none">
              New File
            </Heading>
            <Text>
              Please add a new file
            </Text>
          </Box>
          <Button icon={<Close />} onClick={() => setOpen(false)} />
        </Header>
      </Box>
      <Form
        validate="blur"
        method="post"
        onSubmit={({ value, touched }) => onSubmit({ value, touched })}
      >
        <FormField
          label="File Name"
          htmlFor="file-name-input"
          name="fileNameInput"
        >
          <TextInput value="Star Wars" id="file-name" name="fileName" />
        </FormField>
        <FormField label="Category" htmlFor="categoory-select" name="categorySelect">
          <Select value="Movie" options={Category} id="categoory" name="categoory" />
        </FormField>
        <FormField
          label="Description (Optional)"
          htmlFor="description-textArea"
          name="Description"
        >
          <TextArea id="Description" name="Description" />
        </FormField>
        <FileInput
          messages={{
            dropPrompt: 'Drag and Drop',
            browse: 'Select File',
          }}
          id="fileInput"
          name="fileInput"
        />
        <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
          <Button label="Submit" primary type="submit" />
        </Box>
      </Form>
    </Box>
  );
};
