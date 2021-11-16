import { Box, Button, FileInput, Form, FormField } from 'grommet';
import { useState } from 'react';

const exampleFiles = [
  { name: 'file-size-okay.csv', size: 15000 },
  { name: 'file-size-too-large.zip', size: 2650000 },
];

export const FileInputValidationExample = () => {
  const maxSize = 2621440; // 2.5 MB
  // Initializing value state to demonstrate FileInput Validation state.
  const [value, setValue] = useState({
    fileInput: [exampleFiles[1]],
    fileInputMultiple: exampleFiles,
  });

  return (
    <Form validate="change" value={value} onChange={setValue}>
      <Box width="medium">
        <FormField
          label="File Input With Max Size"
          htmlFor="fileInput"
          name="fileInput"
        >
          <FileInput
            id="fileInput"
            name="fileInput"
            maxSize={maxSize}
            messages={{
              dropPrompt: 'Drag and drop',
              browse: 'Select File',
            }}
          />
        </FormField>
        <FormField
          label="Multiple File Input With Max Size"
          htmlFor="fileInputMultiple"
          name="fileInputMultiple"
        >
          <FileInput
            id="fileInputMultiple"
            name="fileInputMultiple"
            maxSize={maxSize}
            messages={{
              dropPrompt: 'Drag and drop',
              browse: 'Select Files',
            }}
            multiple
          />
        </FormField>
      </Box>
    </Form>
  );
};
