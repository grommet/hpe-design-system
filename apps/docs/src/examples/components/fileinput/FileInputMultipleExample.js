import React, { useState } from 'react';
import { Box, FileInput } from 'grommet';

export const FileInputMultipleExample = () => {
  const [numFiles, setNumFiles] = useState(0);

  return (
    <Box width="medium">
      <FileInput
        messages={{
          dropPromptMultiple: 'Drag and drop',
          browse: numFiles > 0 ? 'Select more files' : 'Select files',
        }}
        onChange={(event, { files }) => setNumFiles(files.length)}
        multiple
      />
    </Box>
  );
};
