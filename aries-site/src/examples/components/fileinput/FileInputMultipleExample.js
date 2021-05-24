import React from 'react';
import { Box, FileInput } from 'grommet';

export const FileInputMultipleExample = () => (
  <Box width="medium">
    <FileInput
      messages={{
        dropPrompt: 'Drag and drop',
        browse: 'Select File',
      }}
      onChange={event => {
        const fileList = event.target.files;
        for (let i = 0; i < fileList.length; i += 1) {
          const file = fileList[i];
          console.log(file.name);
        }
      }}
      multiple
    />
  </Box>
);
