import React, { useState } from 'react';
import { Box, FileInput } from 'grommet';

export const FileInputSimpleExample = () => {
  const [numFiles, setNumFiles] = useState(0);

  return (
    <Box width="medium">
      <FileInput
        messages={{
          dropPrompt: 'Drag and drop',
          browse: numFiles > 0 ? 'Replace File' : 'Select File',
        }}
        onChange={(event, { files }) => {
          const fileList = files;
          setNumFiles(fileList.length);
          for (let i = 0; i < fileList.length; i += 1) {
            const file = fileList[i];
            console.log(file.name);
          }
        }}
      />
    </Box>
  );
};
