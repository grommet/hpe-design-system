import React, { useState } from 'react';
import { Box, FileInput } from 'grommet';

export const FileInputMultipleExample = () => {
  const [numFiles, setNumFiles] = useState(0);

  return (
    <Box width="medium">
      <FileInput
        messages={{
          dropPrompt: 'Drag and drop',
          browse: numFiles > 0 ? 'Select More Files' : 'Select Files',
        }}
        onChange={(event, { files }) => {
          const fileList = files;
          setNumFiles(fileList.length);
          for (let i = 0; i < fileList.length; i += 1) {
            const file = fileList[i];
            console.log(file.name);
          }
        }}
        multiple
      />
    </Box>
  );
};
